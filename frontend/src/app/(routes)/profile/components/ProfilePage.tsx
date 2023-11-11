import UserProfileHeader from './UserProfileHeader';
import UserStats from './UserStats';
import UserPostsGrid from './UserPostsGrid';
import { useQuery } from '@tanstack/react-query';
import { getDataAPI } from '@/utils/axiosCall';
import { useAppDispatch, useAppSelector } from '@/hooks/typeHooks';
import { firstLoad } from '@/store/reducers/authSlice';
import { useEffect } from 'react';
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
    ['user', user?._id],
    async () => {
      if (user?._id) {
        return await getDataAPI(`user/getUser/${profileId}`);
      }
    },
    {
      enabled: !!user?._id,
      retry: 1,
    },
  );

  // @ts-ignore
  const { data: { user: { bio, profilePicture, username, followers, following } = {} } = {} } = userData || {};
  // @ts-ignore
  const { data: { posts } = {} } = userData || {};

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
