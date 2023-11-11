import { IComment, ICommentResponse } from '@/Interface/IComment';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import { BiSolidLike } from 'react-icons/bi';
import Button from '../formComponents/Button';
import { FaEllipsisV } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import When from '../When';
import { postMenus } from '@/static/postMenus';
import CommentInput from '../comment/CommentInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDataAPI, patchDataAPI, postDataAPI } from '@/utils/axiosCall';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppSelector } from '@/hooks/typeHooks';
import { apiCall } from '@/api/apiCall';
import LikeButton from './LikeButton';

interface CommentProps {
  comment: ICommentResponse;
  loading: boolean;
  setLoading: any;
  postId: string;
  commentId: string;
}

const Comment: React.FC<CommentProps> = ({ comment, loading, setLoading, postId, commentId }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isEditingComment, setIsEditingComment] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { user: loggedInUser } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        editComment: yup.string().required('Comment is required'),
      }),
    ),
  });

  useEffect(() => {
    setValue('editComment', comment.text);
  }, []);

  const editMutation = useMutation({
    mutationFn: async (data: IComment) => {
      const response = await patchDataAPI(`comment/${commentId}`, data);
      return response;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await deleteDataAPI(`comment/${commentId}`);
      return response;
    },
    onMutate: async () => {
      // Snapshot the current query data before the mutation
      const previousData = queryClient.getQueryData(['getComment']);

      // Optimistically update the cache with the edited comment
      queryClient.setQueryData(['getComment'], (existingData: any) => {
        if (existingData && existingData.data) {
          return {
            data: existingData.data.filter((comment: any) => comment._id !== commentId),
          };
        }

        return existingData;
      });

      // Return a context object with the snapshot
      return { previousData };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, revert the optimistic update
      queryClient.setQueryData(['getComment'], context?.previousData);
    },
  });

  const likeMutation = useMutation({});

  const handleMoreOptionsClick = (menu: any) => {
    if (menu.type === 'DELETE') {
      deleteComment();
    } else {
      setIsEditingComment(true);
    }
    setShowOptions(false);
  };

  const onSubmit = async (data: any) => {
    if (data.editComment.trim() !== '') {
      const commentData = {
        text: data.editComment,
        postId,
      };

      apiCall({
        fn: async () => {
          await editMutation.mutateAsync(commentData);
        },
        setLoading,
      });
      reset({ editComment: '' });

      setIsEditingComment(false);
    }
  };

  const commentStyle = comment.parentComment ? 'p-2 ml-16 mt-1' : 'mt-4';
  const isCommenter = loggedInUser?._id === comment.userDetails?._id;

  const deleteComment = () => {
    apiCall({
      fn: async () => {
        await deleteMutation.mutateAsync();
      },
      setLoading,
    });
  };

  return (
    <div className={`flex items-start bg-gray-100 p-2 rounded-md relative ${commentStyle}`}>
      <div className="flex flex-grow">
        <Image
          src={comment.userDetails?.profilePicture || ''}
          alt={`${comment.userDetails?.username}'s profile`}
          className="rounded-full mr-4"
          width={40}
          height={40}
        />
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <span className="font-semibold">{comment.userDetails?.username ?? 'Unknown'}</span>
            <span className="text-gray-500 ml-2">{formatDate(comment.createdAt)}</span>
          </div>
          <When isTrue={!isEditingComment}>
            <div className="text-gray-800">{comment.text}</div>
          </When>
          <When isTrue={isEditingComment}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CommentInput
                {...{
                  handleSubmit,
                  onSubmit,
                  errors,
                  loading,
                  control,
                  name: 'editComment',
                  defaultValue: getValues('editComment'),
                }}
              />
            </form>
          </When>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <LikeButton
                {...{
                  userHasLiked: comment.isLiked,
                  likeCount: comment.likes.length,
                  _id: comment._id,
                  likeContext: 'comment',
                }}
              />
            </div>
            {/* to be added later */}
            {/* <div className="text-blue-400 cursor-pointer">Reply</div> */}
          </div>
        </div>
      </div>

      <div>
        <When isTrue={isCommenter}>
          <Button
            {...{
              onClick: () => setShowOptions(!showOptions),
            }}
          >
            <FaEllipsisV size={20} />
          </Button>
        </When>
        <When isTrue={showOptions}>
          <div
            className={`bg-gray-800 absolute top-12 ${
              comment.parentComment ? '-right-32' : '-right-40'
            } -right-40 z-30  text-white w-1/3 rounded-md`}
          >
            {postMenus.map((menu, index) => {
              return (
                <button
                  key={index}
                  className={`text-lg p-2 text-left w-full block font-semibold text-white rounded-md bg-transparent hover:bg-gray-600 cursor-pointer border-none outline-none `}
                  onClick={() => handleMoreOptionsClick(menu)}
                >
                  {menu.label}
                </button>
              );
            })}
          </div>
        </When>
      </div>
    </div>
  );
};

export default Comment;
