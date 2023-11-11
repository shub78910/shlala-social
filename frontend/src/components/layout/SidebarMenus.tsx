'use client';

import { useRouter } from 'next/navigation';
import Button from '../formComponents/Button';
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { sidebarMenus } from '@/static/sidebarMenus';
import When from '../When';
import CreateNewPost from '../post/CreateNewPost';
import { useAppDispatch, useAppSelector } from '@/hooks/typeHooks';
import { setSelectedMenu } from '@/store/reducers/miscSlice';

const SidebarMenus = () => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const { selectedMenu } = useAppSelector((state) => state.misc);

  const handleClick = (menu: any) => {
    dispatch(setSelectedMenu(menu.text));
    if (menu.path === '/profile') {
      router.push(`${menu.path}/${user?._id}`);
    } else {
      router.push(menu.path);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 text-left">
      <Button
        className="bg-gray-900 hover:bg-gray-800 text-xl font-semibold text-white py-4 mb-6 flex items-center gap-2 justify-center"
        {...{
          onClick: () => setModalOpen(true),
        }}
      >
        <span>
          <GoPlus />
        </span>
        <span>Add New Post</span>
      </Button>

      <When isTrue={isModalOpen}>
        <CreateNewPost setModalOpen={setModalOpen} />
      </When>

      {sidebarMenus.map((menu, index) => (
        <button
          key={index}
          className={`w-full py-2 text-xl font-semibold text-white rounded-md bg-transparent hover:bg-gray-600 cursor-pointer border-none outline-none `}
          style={{ backgroundColor: selectedMenu === menu.text ? '#4B5563' : '' }}
          onClick={() => handleClick(menu)}
        >
          {menu.text}
        </button>
      ))}
    </div>
  );
};

export default SidebarMenus;
