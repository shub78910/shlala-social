import mongoose from 'mongoose';
import modelConstants from '../constants';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'https://freepngimg.com/thumb/model/94766--free-download-image.png',
  },
  bio: {
    type: String,
    maxlength: 160,
    default: "Hey, I'm new to shlala social",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelConstants.postModelName,
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelConstants.userModelName,
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelConstants.userModelName,
    },
  ],
});

const User = mongoose.model(modelConstants.userModelName, userSchema);
export default User;
