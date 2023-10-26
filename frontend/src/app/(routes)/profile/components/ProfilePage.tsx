import UserProfileHeader from './UserProfileHeader';
import UserStats from './UserStats';
import UserPostsGrid from './UserPostsGrid';
import { useQuery } from '@tanstack/react-query';
import { getDataAPI } from '@/utils/axiosCall';
import { useAppSelector } from '@/hooks/typeHooks';

const ProfilePage = () => {
  //   const { user } = useAppSelector((state) => state.user);

  //   const { isLoading, data } = useQuery(['user'], async () => await getDataAPI(`/posts/user/${user?._id}`));
  //   console.log({ data, isLoading });
  return (
    <div className="max-w-4xl mx-auto text-white bg-gray-700 rounded">
      <UserProfileHeader />
      <UserStats />
      <UserPostsGrid />
    </div>
  );
};
export default ProfilePage;
