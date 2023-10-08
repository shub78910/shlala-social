import mongoose from 'mongoose';
import modelConstants from '../constants';

// Todo:
// add schema for tagging a user in a comment
const commentSchema = new mongoose.Schema(
  {
    text: String,
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelConstants.postModelName,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelConstants.userModelName,
    },
    parentComment: {
      // Reference to the parent comment (if it's a reply)
      type: mongoose.Schema.Types.ObjectId,
      ref: modelConstants.commentModelName,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  },
  { timestamps: true },
);

const Comment = mongoose.model(modelConstants.commentModelName, commentSchema);
export default Comment;
