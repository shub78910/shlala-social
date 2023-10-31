import When from '@/components/When';
import Button from '@/components/formComponents/Button';
import Image from 'next/image';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal';

const UserProfileHeader = ({
  userName,
  bio,
  profilePicture,
  refetch,
}: {
  userName: string;
  bio: string;
  profilePicture: string;
  refetch: any;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

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
          <Button
            className="bg-gray-800 hover:bg-gray-900 text-white"
            {...{
              onClick: () => setModalOpen(true),
            }}
          >
            Edit Profile
          </Button>
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
