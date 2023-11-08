import { ICommentResponse } from '@/Interface/IComment';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import { BiSolidLike } from 'react-icons/bi';
import Button from '../formComponents/Button';
import { FaEllipsisV } from 'react-icons/fa';
import { useState } from 'react';
import When from '../When';
import { postMenus } from '@/static/postMenus';

interface CommentProps {
  comment: ICommentResponse;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
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

  const commentStyle = comment.parentComment ? 'p-2 ml-16 mt-1' : 'mt-4';

  return (
    <div className={`flex items-start justify-between bg-gray-100 p-2 rounded-md relative ${commentStyle}`}>
      <div className="flex">
        <Image
          src={comment.userDetails?.profilePicture || ''}
          alt={`${comment.userDetails?.username}'s profile`}
          className="rounded-full mr-4"
          width={40}
          height={40}
        />
        <div>
          <div className="flex items-center mb-2">
            <span className="font-semibold">{comment.userDetails?.username ?? 'Unknown'}</span>
            <span className="text-gray-500 ml-2">{formatDate(comment.createdAt)}</span>
          </div>
          <div className="text-gray-800">{comment.text}</div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BiSolidLike size={20} color="black" />
              <span>{comment.likes.length}</span>
            </div>
            <div className="text-blue-400 cursor-pointer">Reply</div>
          </div>
        </div>
      </div>

      <div>
        <Button
          {...{
            onClick: () => setShowOptions(!showOptions),
          }}
        >
          <FaEllipsisV size={20} />
        </Button>
        <When isTrue={showOptions}>
          <div
            className={`bg-gray-800 absolute top-12 ${
              comment.parentComment ? '-right-32' : '-right-40'
            } -right-40 z-30  text-white w-1/3 rounded-md`}
          >
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
      </div>
    </div>
  );
};

export default Comment;
