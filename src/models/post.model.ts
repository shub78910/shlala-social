import mongoose from 'mongoose';
import modelConstants from '../constants';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelConstants.userModelName,
      required: [true, 'User Id is required.'],
    },
    userName: {
      type: String,
      required: [true, 'User name is required.'],
    },
    userImage: {
      type: String,
      required: [true, 'User image is required.'],
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
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: modelConstants.commentModelName }],
  },
  { timestamps: true },
);

const Post = mongoose.model(modelConstants.postModelName, postSchema);
export default Post;
