import { BiCommentDetail } from 'react-icons/bi';
import Button from '../formComponents/Button';
import exp from 'constants';

const CommentButton = ({
  commentCount,
  _id,
  setShowCommentSection,
  showCommentSection,
}: {
  commentCount: number;
  _id: string;
  setShowCommentSection: (showCommentSection: boolean) => void;
  showCommentSection: boolean;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        {...{
          onClick: () => setShowCommentSection(!showCommentSection),
        }}
      >
        <BiCommentDetail size={20} />
      </Button>
      <span className="text-lg font-medium">{commentCount}</span>
    </div>
  );
};

export default CommentButton;
