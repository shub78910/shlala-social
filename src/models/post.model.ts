import mongoose from 'mongoose';
import modelConstants from '../constants';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelConstants.userModelName,
      required: [true, 'User Id is required.'],
    },
    image: {
      type: String,
      required: [true, 'Image is required.'],
    },
    caption: {
      type: String,
      required: [true, 'Caption is required.'],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelConstants.userModelName,
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelConstants.userModelName,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', postSchema);
export default Post;
