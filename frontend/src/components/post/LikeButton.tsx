import { BiSolidLike } from 'react-icons/bi';
import Button from '../formComponents/Button';
import { useMutation } from '@tanstack/react-query';
import { postDataAPI } from '@/utils/axiosCall';
import { useState } from 'react';

const LikeButton = ({
  userHasLiked: initialUserHasLiked,
  likeCount: initialLikeCount,
  _id,
}: {
  userHasLiked: boolean;
  likeCount: number;
  _id: string;
}) => {
  const [userHasLiked, setUserHasLiked] = useState(initialUserHasLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const afterMutation = {
    onMutate: () => {
      setLikeCount((prevCount) => (userHasLiked ? prevCount - 1 : prevCount + 1));
      setUserHasLiked(!userHasLiked);
    },
    onError: () => {
      setLikeCount(initialLikeCount);
      setUserHasLiked(initialUserHasLiked);
    },
  };

  const likeMutation = useMutation(async () => {
    await postDataAPI(`posts/like/${_id}`);
  }, afterMutation);

  const unlikeMutation = useMutation(async () => {
    await postDataAPI(`posts/unlike/${_id}`);
  }, afterMutation);

  const handleLikeClick = () => {
    if (likeMutation.isLoading || unlikeMutation.isLoading) {
      return;
    }

    if (userHasLiked) {
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
        <BiSolidLike size={20} color={`${userHasLiked ? 'blue' : 'black'}`} />
      </Button>
      <span className="text-lg font-medium">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
