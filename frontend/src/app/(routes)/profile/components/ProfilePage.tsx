import UserProfileHeader from './UserProfileHeader';
import UserStats from './UserStats';
import UserPostsGrid from './UserPostsGrid';
import { useQuery } from '@tanstack/react-query';
import { getDataAPI } from '@/utils/axiosCall';
import { useAppDispatch, useAppSelector } from '@/hooks/typeHooks';
import { firstLoad } from '@/store/reducers/authSlice';
import { useEffect, useState } from 'react';
import When from '@/components/When';
import Loader from '@/components/Loader';
import { useParams } from 'next/navigation';

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(firstLoad());
  }, []);

  const params = useParams();
  const profileId = params.profileId as string;

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.user);

  const {
    isLoading,
    data: userData,
    refetch,
  }: {
    isLoading: boolean;
    data: any;
    refetch: any;
  } = useQuery(
    ['user'],
    async () => {
      return await getDataAPI(`user/getUser/${profileId}`);
    },
    {
      retry: 3,
    },
  );

  // @ts-ignore
  const { data: { user: { bio, profilePicture, username, followers, following } = {} } = {} } = userData || {};
  const posts = userData?.data?.posts;

  useEffect(() => {
    setIsFollowing(userData?.data?.isFollowing);
  }, [userData?.data?.isFollowing]);

  return (
    <div className="max-w-4xl mx-auto text-white bg-gray-700 rounded">
      <When isTrue={isLoading}>
        <div className="flex justify-center">
          <Loader />
        </div>
      </When>
      <When isTrue={!isLoading}>
        <UserProfileHeader
          {...{
            bio: bio,
            profilePicture: profilePicture,
            userName: username,
            refetch,
            profileId,
            isFollowing,
            setIsFollowing,
          }}
        />
        <UserStats
          {...{
            followers: followers?.length,
            following: following?.length,
            posts: posts?.length,
          }}
        />
        <UserPostsGrid {...{ posts }} />
      </When>
    </div>
  );
};
export default ProfilePage;
