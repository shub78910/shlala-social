import { BiSolidLike } from 'react-icons/bi';
import Button from '../formComponents/Button';
import { useMutation } from '@tanstack/react-query';
import { patchDataAPI } from '@/utils/axiosCall';
import { useState } from 'react';

const LikeButton = ({
  userHasLiked: initialUserHasLiked,
  likeCount: initialLikeCount,
  _id,
  likeContext,
}: {
  userHasLiked: boolean;
  likeCount: number;
  _id: string;
  likeContext: string;
}) => {
  const [isLiked, setIsLiked] = useState(initialUserHasLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const afterMutation = {
    onMutate: () => {
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      setIsLiked(!isLiked);
    },
    onError: () => {
      setLikeCount(initialLikeCount);
      setIsLiked(initialUserHasLiked);
    },
  };

  const likeMutation = useMutation(async () => {
    await patchDataAPI(`${likeContext}/like/${_id}`, {});
  }, afterMutation);

  const unlikeMutation = useMutation(async () => {
    await patchDataAPI(`${likeContext}/unlike/${_id}`, {});
  }, afterMutation);

  const handleLikeClick = () => {
    if (likeMutation.isLoading || unlikeMutation.isLoading) {
      return;
    }

    if (isLiked) {
      unlikeMutation.mutateAsync();
    } else {
      likeMutation.mutateAsync();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Button
        {...{
          onClick: handleLikeClick,
        }}
      >
        <BiSolidLike size={20} className={`${isLiked ? 'text-blue-500' : 'text-black'}`} />
      </Button>
      <span className="text-lg font-medium">{likeCount === 0 ? '' : likeCount}</span>
    </div>
  );
};

export default LikeButton;
