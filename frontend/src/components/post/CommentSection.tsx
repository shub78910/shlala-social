import React, { useState } from 'react';
import Input from '../formComponents/Input';
import { Controller, useForm } from 'react-hook-form';
import Button from '../formComponents/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDataAPI, postDataAPI } from '@/utils/axiosCall';
import Comment from './Comment';
import { IComment, ICommentResponse } from '@/Interface/IComment';
import ButtonWithSpinner from '../formComponents/ButtonWithSpinner';
import { query } from 'express';
import When from '../When';
import Loader from '../Loader';
import CommentInput from '../comment/CommentInput';
import { apiCall } from '@/api/apiCall';

interface CommentSectionProps {
  _id: string;
}

// check why the api is being called multiple times and why the following api is being called at all.

const CommentSection: React.FC<CommentSectionProps> = ({ _id: postId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        comment: yup.string().required('Comment is required'),
      }),
    ),
  });

  const {
    data: { data: fetchedComments } = {},
    isLoading,
  }: {
    data: any;
    isLoading: boolean;
  } = useQuery(['getComment'], async () => await getDataAPI(`comment/${postId}`));

  const mutation = useMutation({
    mutationFn: async (data: IComment) => {
      const response = await postDataAPI('comment', data);

      // // Manually update the cache to reflect the new comment
      queryClient.setQueryData(['getComment'], (previousData: any) => {
        if (previousData) {
          return {
            data: [
              ...previousData.data,
              {
                ...response.data.savedComment,
                userDetails: response.data.userDetails,
              },
            ],
          };
        }
        return previousData;
      });

      return response;
    },
  });

  const onSubmit = async (data: any) => {
    if (data.comment.trim() !== '') {
      const commentData = {
        text: data.comment,
        postId: postId,
      };
      apiCall({
        fn: async () => {
          await mutation.mutateAsync(commentData);
          reset({ comment: '' });
        },
        setLoading,
      });
    }
  };

  // remove: NEXT THINGS TO BE DONE WOULD BE
  // LIKE, EDIT AND DELETE COMMENT doneeeeee
  // SHOW THE MENU ONLY TO PEOPLE WHO HAVE COMMENTED THEM done

  // THEN MOVE 0N TO MAKING THE USER DETAIL PAGE
  // FOLLOW UNFOLLOW
  // THEN MESSAGE

  return (
    <div>
      <When isTrue={isLoading}>
        <Loader />
      </When>

      <When isTrue={!isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommentInput
            {...{
              handleSubmit,
              onSubmit,
              errors,
              loading,
              control,
              name: 'comment',
            }}
          />
        </form>

        <div>
          {fetchedComments?.map((comment: ICommentResponse) => (
            <Comment
              {...{
                comment,
                loading,
                setLoading,
                postId,
                commentId: comment._id,
              }}
              key={comment._id}
            />
          ))}
        </div>
      </When>
    </div>
  );
};

export default CommentSection;
