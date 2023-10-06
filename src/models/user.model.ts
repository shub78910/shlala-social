import mongoose from 'mongoose';
import modelConstants from '../constants';

const userSchema = new mongoose.Schema({
  username: {
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
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png',
  },
  bio: {
    type: String,
    maxlength: 160,
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
