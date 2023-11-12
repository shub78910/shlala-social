import When from '@/components/When';
import Button from '@/components/formComponents/Button';
import Image from 'next/image';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal';
import { useAppSelector } from '@/hooks/typeHooks';
import FollowButton from '@/components/profile/FollowButton';

const UserProfileHeader = ({
  userName,
  bio,
  profilePicture,
  refetch,
  profileId,
  isFollowing,
  setIsFollowing,
}: {
  userName: string;
  bio: string;
  profilePicture: string;
  refetch: any;
  profileId: string;
  isFollowing: boolean;
  setIsFollowing: any;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="p-2 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div>
            <Image
              src={profilePicture}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full bg-white object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold">{userName}</h1>
        </div>
        <div>
          <When isTrue={profileId === user?._id}>
            <Button
              className="bg-gray-800 hover:bg-gray-900 text-white"
              {...{
                onClick: () => setModalOpen(true),
              }}
            >
              Edit Profile
            </Button>
          </When>

          <When isTrue={profileId !== user?._id}>
            <FollowButton
              {...{
                profileId,
                isFollowing,
                setIsFollowing,
              }}
            />
          </When>
        </div>

        <When isTrue={isModalOpen}>
          <EditProfileModal
            {...{
              userName,
              bio,
              profilePicture,
              setModalOpen,
              refetch,
            }}
          />
        </When>
      </div>

      <div className="mt-4">{bio}</div>
    </div>
  );
};

export default UserProfileHeader;
