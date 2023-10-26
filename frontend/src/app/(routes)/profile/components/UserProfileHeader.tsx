import Button from '@/components/formComponents/Button';
import Image from 'next/image';

const UserProfileHeader: React.FC = () => {
  return (
    <div className="p-2 px-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="rounded-full bg-white object-contain p-1">
            <Image
              src="https://freepngimg.com/thumb/model/94766--free-download-image.png"
              alt="profile"
              width={50}
              height={50}
            />
          </div>
          <h1 className="text-2xl font-semibold">User Name</h1>
        </div>
        <div>
          <Button className="bg-blue-800 hover:bg-blue-900">Edit Profile</Button>
        </div>
      </div>

      <div className="mt-4">
        User Bio User Bio User Bio User Bio User Bio User Bio User Bio User Bio User Bio User Bio User Bio User Bio User
        Bio User Bio User Bio{' '}
      </div>
    </div>
  );
};

export default UserProfileHeader;
