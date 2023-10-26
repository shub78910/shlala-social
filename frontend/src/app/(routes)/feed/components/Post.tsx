import Image from 'next/image';
import { BiSolidLike } from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { BiSolidShareAlt } from 'react-icons/bi';
import { FaEllipsisV } from 'react-icons/fa';
import Button from '../../../../components/formComponents/Button';

const Post = ({
  userName,
  userImage,
  caption,
  createdAt,
  image,
  likeCount,
}: {
  userName: string;
  userImage: string;
  caption: string;
  createdAt: string;
  image: string;
  likeCount: number;
}) => {
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
      <div className="flex justify-between mt-4">
        <div className="flex space-x-4">
          <div>
            <Button>
              <BiSolidLike size={20} />
            </Button>
            <span>{likeCount}</span>
          </div>
          <Button>
            <BiCommentDetail size={20} />
          </Button>
          <Button>
            <BiSolidShareAlt size={20} />
          </Button>
        </div>
        <Button>
          <FaEllipsisV size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Post;
