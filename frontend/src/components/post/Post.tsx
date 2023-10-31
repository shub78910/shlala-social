import Image from 'next/image';
import { BiSolidLike } from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { BiSolidShareAlt } from 'react-icons/bi';
import { FaEllipsisV } from 'react-icons/fa';
import Button from '../formComponents/Button';
import When from '@/components/When';
import { useState } from 'react';
import { postMenus } from '@/static/postMenus';
import DeleteModal from '@/components/post/DeleteModal';
import EditModal from '@/components/post/EditModal';
import LikeButton from './LikeButton';

const Post = ({
  userName,
  userImage,
  caption,
  createdAt,
  image,
  likeCount,
  _id,
  userHasLiked,
  refetch,
}: {
  userName: string;
  userImage: string;
  caption: string;
  createdAt: string;
  image: string;
  likeCount: number;
  _id: string;
  userHasLiked: boolean;
  refetch?: any;
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleMoreOptionsClick = (menu: any) => {
    if (menu.type === 'DELETE') {
      setShowDeleteModal(true);
    } else {
      setShowEditModal(true);
    }
    setShowOptions(false);
  };

  return (
    <div className="bg-gray-200 p-4 m-2 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Image src={userImage} alt={userName} height={40} width={40} className="rounded-full object-cover" />
        <div>
          <div className="font-bold">{userName}</div>
          <div className="text-gray-500">{createdAt}</div>
        </div>
      </div>
      <p className="mt-4">{caption}</p>
      <Image src={image} alt="Post" width={500} height={500} className="mt-4 w-full object-cover rounded" />
      <div className="flex justify-between mt-4 relative">
        <div className="flex space-x-4">
          <LikeButton
            {...{
              userHasLiked,
              likeCount,
              _id,
            }}
          />
          <Button>
            <BiCommentDetail size={20} />
          </Button>
          <Button>
            <BiSolidShareAlt size={20} />
          </Button>
        </div>
        <Button
          {...{
            onClick: () => setShowOptions(!showOptions),
          }}
        >
          <FaEllipsisV size={20} />
        </Button>
        <When isTrue={showOptions}>
          <div className="bg-gray-800 absolute -right-40 bottom-12 z-30  text-white w-1/3 rounded-md">
            {postMenus.map((menu, index) => {
              return (
                <button
                  key={index}
                  className={`text-lg p-2 text-left w-full block font-semibold text-white rounded-md bg-transparent hover:bg-gray-600 cursor-pointer border-none outline-none `}
                  onClick={() => handleMoreOptionsClick(menu)}
                >
                  {menu.label}
                </button>
              );
            })}
          </div>
        </When>
        <When isTrue={showDeleteModal}>
          <DeleteModal
            {...{
              setShowDeleteModal,
              _id,
            }}
          />
        </When>
        <When isTrue={showEditModal}>
          <EditModal
            {...{
              setShowEditModal,
              _id,
              caption,
              refetch,
            }}
          />
        </When>
      </div>
    </div>
  );
};

export default Post;
