import React, { useState } from 'react';
import Input from '../formComponents/Input';
import { Controller, useForm } from 'react-hook-form';
import Button from '../formComponents/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDataAPI, postDataAPI } from '@/utils/axiosCall';
import Comment from './Comment';
import { ICommentResponse } from '@/Interface/IComment';
import ButtonWithSpinner from '../formComponents/ButtonWithSpinner';
import { query } from 'express';
import When from '../When';
import Loader from '../Loader';

interface CommentProps {
  _id: string;
}

interface IComment {
  text: string;
  parentCommentId?: string;
  postId: string;
}

// check why the api is being called multiple times and why the following api is being called at all.

const CommentSection: React.FC<CommentProps> = ({ _id }) => {
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
  } = useQuery(['getComment'], async () => await getDataAPI(`comment/${_id}`));

  const mutation = useMutation({
    mutationFn: async (data: IComment) => {
      const response = await postDataAPI('comment', data);

      // Manually update the cache to reflect the new comment
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
        postId: _id,
      };
      setLoading(true);
      await mutation.mutateAsync(commentData);
      reset();
      setLoading(false);
    }
  };

  // remove: NEXT THINGS TO BE DONE WOULD BE
  // LIKE, EDIT AND DELETE COMMENT
  // SHOW THE MENU ONLY TO PEOPLE WHO HAVE POSTED THEM
  // THEN MOVE 0N TO MAKING THE MESSAGING FEATURE

  return (
    <div>
      <When isTrue={isLoading}>
        <Loader
          {...{
            height: '100',
            width: '100',
            radius: 1,
            color: '#f8fafc',
          }}
        />
      </When>

      <When isTrue={!isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex justify-between items-baseline gap-2">
            <div className="w-full">
              <Controller
                name="comment"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Add a comment"
                    errors={errors}
                    name="comment"
                    {...{
                      type: 'text',
                      className: 'py-4',
                    }}
                  />
                )}
              />
            </div>

            <div>
              <ButtonWithSpinner
                {...{
                  onClick: handleSubmit(onSubmit),
                  className: 'bg-blue-500 text-white py-2 px-4 rounded ml-2 min-w-full',
                  spinner: loading,
                  disabled: loading,
                }}
              >
                Comment
              </ButtonWithSpinner>
            </div>
          </div>
        </form>

        <div>
          {fetchedComments?.map((comment: ICommentResponse) => <Comment comment={comment} key={comment._id} />)}
        </div>
      </When>
    </div>
  );
};

export default CommentSection;
