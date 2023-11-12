import { useMutation } from '@tanstack/react-query';
import { patchDataAPI } from '@/utils/axiosCall';
import { apiCall } from '@/api/apiCall';
import { useState } from 'react';
import ButtonWithSpinner from '../formComponents/ButtonWithSpinner';

interface IFollowButtonProps {
  profileId: string;
  isFollowing: boolean;
  setIsFollowing: any;
}
const FollowButton: React.FC<IFollowButtonProps> = ({ profileId, isFollowing, setIsFollowing }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const followMutation = useMutation({
    mutationFn: async () => {
      await patchDataAPI(`user/follow/${profileId}`, {});
    },
    onMutate: () => {
      setIsFollowing(true);
    },
    onError: () => {
      setIsFollowing(false);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async () => {
      await patchDataAPI(`user/unfollow/${profileId}`, {});
    },
    onMutate: () => {
      setIsFollowing(false);
    },
    onError: () => {
      setIsFollowing(true);
    },
  });

  const followUser = () => {
    apiCall({
      fn: async () => {
        await followMutation.mutateAsync();
      },
      setLoading,
    });
  };

  const unfollowUser = () => {
    apiCall({
      fn: async () => {
        await unfollowMutation.mutateAsync();
      },
      setLoading,
    });
  };
  return (
    <ButtonWithSpinner
      {...{
        onClick: () => {
          if (isFollowing) {
            unfollowUser();
          } else {
            followUser();
          }
        },
        spinner: loading,
        className: 'bg-gray-800 hover:bg-gray-900 text-white w-36',
      }}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </ButtonWithSpinner>
  );
};

export default FollowButton;
