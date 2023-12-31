import Image from 'next/image';
import { BiCommentDetail } from 'react-icons/bi';
import { BiSolidShareAlt } from 'react-icons/bi';
import { FaEllipsisV } from 'react-icons/fa';
import Button from '../formComponents/Button';
import When from '@/components/When';
import { useState } from 'react';
import { postMenus } from '@/static/postMenus';
import DeleteModal from '@/components/post/DeleteModal';
import EditPostModal from '@/components/post/EditPostModal';
import LikeButton from './LikeButton';
import formatDate from '@/utils/formatDate';
import CommentButton from './CommentButton';
import CommentSection from './CommentSection';
import { useAppSelector } from '@/hooks/typeHooks';
import { useRouter } from 'next/navigation';

const Post = ({
  postDetails,
  userDetails,
  refetch,
}: {
  postDetails: {
    userId: string;
    caption: string;
    createdAt: string;
    image: string;
    likeCount: number;
    commentCount: number;
    _id: string;
    userHasLiked: boolean;
  };
  userDetails: {
    username: string;
    profilePicture: string;
  };
  refetch?: any;
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCommentSection, setShowCommentSection] = useState<boolean>(false);

  const { user: loggedInUser } = useAppSelector((state) => state.user);

  const router = useRouter();

  const handleMoreOptionsClick = (menu: any) => {
    if (menu.type === 'DELETE') {
      setShowDeleteModal(true);
    } else {
      setShowEditModal(true);
    }
    setShowOptions(false);
  };

  const navigateToProfile = () => {
    router.push(`/profile/${userId}`);
  };

  const { username, profilePicture: userImage } = userDetails;
  const { caption, createdAt, image, likeCount, commentCount, _id, userHasLiked, userId } = postDetails;

  return (
    <div className="bg-gray-200 p-4 m-2 rounded-md shadow-md">
      <div className="flex items-start gap-2 cursor-pointer" onClick={navigateToProfile}>
        <Image src={userImage} alt={username} height={40} width={40} className="rounded-full object-cover" />
        <div>
          <div className="font-bold">{username}</div>
          <div className="text-gray-500 mt-1">{formatDate(createdAt)}</div>
        </div>
      </div>
      <Image src={image} alt="Post" width={500} height={500} className="mt-4 w-full object-cover rounded" />
      <p className="mt-4">{caption}</p>
      <div className="flex justify-between mt-4 relative z-30">
        <div className="flex space-x-4">
          <LikeButton
            {...{
              userHasLiked,
              likeCount,
              _id,
              likeContext: 'posts',
            }}
          />
          <CommentButton
            {...{
              commentCount,
              setShowCommentSection,
              showCommentSection,
              _id,
            }}
          />
          <Button
            {...{
              onClick: () => {
                navigator.clipboard.writeText(`${window.location.origin}/post/${_id}`);
              },
            }}
          >
            <BiSolidShareAlt size={20} />
          </Button>
        </div>
        <When isTrue={loggedInUser?._id === userId}>
          <Button
            {...{
              onClick: () => setShowOptions(!showOptions),
            }}
          >
            <FaEllipsisV size={20} />
          </Button>
        </When>

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
          <EditPostModal
            {...{
              setShowEditModal,
              _id,
              caption,
              refetch,
            }}
          />
        </When>
      </div>
      <When isTrue={showCommentSection}>
        <div>
          <CommentSection
            {...{
              _id,
            }}
          />
        </div>
      </When>
    </div>
  );
};

export default Post;
