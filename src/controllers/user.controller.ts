import { IReqAuth, IUser, objectId } from '../config/interface';
import User from '../models/user.model';
import { Response } from 'express';
import { convertToObjectId } from '../utils/convertToObjectId';
import Post from '../models/post.model';

const userController = {
  follow: async (req: IReqAuth, res: Response) => {
    try {
      const userId = convertToObjectId(req.params.userId);
      const loggedInUserId: objectId = req.user?._id;

      if (userId === loggedInUserId) {
        return res.status(400).json({ message: 'You cannot follow yourself.' });
      }

      const userToFollow = await User.findById(userId);
      if (!userToFollow) {
        return res.status(404).json({ message: 'User not found.' });
      }

      if (userToFollow.followers.includes(loggedInUserId)) {
        return res.status(400).json({ message: 'You are already following this user.' });
      }

      await User.findByIdAndUpdate(userId, { $addToSet: { followers: loggedInUserId } });

      await User.findByIdAndUpdate(loggedInUserId, { $addToSet: { following: userId } });

      res.json({ message: 'You are now following the user.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error following the user.' });
    }
  },

  unfollow: async (req: IReqAuth, res: Response) => {
    try {
      const userId = convertToObjectId(req.params.userId);
      const loggedInUserId: objectId = req.user?._id;

      const userToUnfollow = await User.findById(userId);
      if (!userToUnfollow) {
        return res.status(404).json({ message: 'User not found.' });
      }

      if (!userToUnfollow.followers.includes(loggedInUserId)) {
        return res.status(400).json({ message: 'You are not following this user.' });
      }

      await User.findByIdAndUpdate(userId, { $pull: { followers: loggedInUserId } });

      await User.findByIdAndUpdate(loggedInUserId, { $pull: { following: userId } });

      res.json({ message: 'You have unfollowed the user.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error unfollowing the user.' });
    }
  },

  editUser: async (req: IReqAuth, res: Response) => {
    try {
      const loggedInUserId: objectId = req.user?._id;

      const {
        username,
        profilePicture,
        bio,
      }: {
        username: string;
        profilePicture: string;
        bio: string;
      } = req.body;

      await User.findByIdAndUpdate(loggedInUserId, { username, profilePicture, bio });

      res.json({ username, profilePicture, bio });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating the user.' });
    }
  },

  getUser: async (req: IReqAuth, res: Response) => {
    try {
      const userId = convertToObjectId(req.params.userId);

      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const posts = await Post.aggregate([
        {
          $match: { userId: userId },
        },
        {
          $sort: { createdAt: -1 },
        },

        {
          $addFields: {
            userHasLiked: {
              $in: [userId, '$likes'],
            },
          },
        },
      ]);

      res.json({ user, posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching the user.' });
    }
  },

  searchUser: async (req: IReqAuth, res: Response) => {
    try {
      const query = req.query.username as string;

      const users = await User.find({
        username: { $regex: query, $options: 'i' },
      }).select('-password');

      res.json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching for users.' });
    }
  },
};

export default userController;
