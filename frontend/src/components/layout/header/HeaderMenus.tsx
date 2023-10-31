import When from '@/components/When';
import Button from '@/components/formComponents/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/typeHooks';
import { logoutUser } from '@/store/reducers/authSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const HeaderMenus = () => {
  const [showMenuList, setShowMenuList] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const navigateToProfile = () => {
    router.push('/profile');
  };

  const logout = () => {
    dispatch(() => logoutUser());
    router.push('/');
  };
  return (
    <div
      className="flex justify-center items-center gap-2 text-white cursor-pointer relative"
      onClick={() => setShowMenuList(!showMenuList)}
    >
      <div>
        <Image src={user?.profilePicture || ''} width={40} height={40} className="rounded-full" alt="profile" />
      </div>
      <div className="hidden md:block">{user?.username}</div>
      <RiArrowDropDownLine size={30} />

      <When isTrue={showMenuList}>
        <div className="bg-gray-800 absolute top-12 right-0 text-white w-40 rounded-md z-50">
          <div>
            <button
              className={`text-lg p-2 text-left w-full block font-semibold text-white rounded-md bg-transparent hover:bg-gray-700 cursor-pointer border-none outline-none `}
              onClick={() => navigateToProfile()}
            >
              Profile
            </button>
            <button
              className={`text-lg p-2 text-left w-full block font-semibold text-white rounded-md bg-transparent hover:bg-gray-700 cursor-pointer border-none outline-none `}
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </When>
    </div>
  );
};

export default HeaderMenus;
