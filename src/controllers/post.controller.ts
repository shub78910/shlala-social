import { Response } from 'express';
import Post from '../models/post.model';
import { IQuery, IReqAuth, objectId } from '../config/interface';
import User from '../models/user.model';
import { convertToObjectId } from '../utils/convertToObjectId';
import Comment from '../models/comment.model';

const postController = {
  createPost: async (req: IReqAuth, res: Response) => {
    try {
      const {
        caption,
        image,
        userId,
      }: {
        caption: string;
        image: string;
        userId: string;
      } = req.body;

      // Todo:
      // add location, tag people, add music maybe

      const newPost = new Post({
        caption,
        image,
        userId,
      });

      const savedPost = await newPost.save();

      console.log({ savedPost });

      await User.findByIdAndUpdate(req.user?._id, { $push: { posts: savedPost._id } }, { new: true });

      console.log('done');

      res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the post.' });
    }
  },

  updatePost: async (req: IReqAuth, res: Response) => {
    try {
      const {
        caption,
      }: {
        caption: string;
      } = req.body;

      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }

      if (post.userId.toString() !== req.user?._id.toString()) {
        return res.status(403).json({ message: 'Permission denied. You are not the author of this post.' });
      }

      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, { caption }, { new: true });

      res.status(201).json({ updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the post.' });
    }
  },

  deletePost: async (req: IReqAuth, res: Response) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }

      if (post.userId.toString() !== req.user?._id.toString()) {
        return res.status(403).json({ message: 'Permission denied. You are not the author of this post.' });
      }

      await Post.findByIdAndRemove(req.params.postId);

      await User.findByIdAndUpdate(req.user._id, { $pull: { posts: req.params.postId } }, { new: true });

      res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the post.' });
    }
  },

  getPosts: async (req: IReqAuth, res: Response) => {
    try {
      const { offset = '0', limit = '10' } = req.query as unknown as IQuery;
      const loggedInUserId: objectId = req.user?._id;

      const posts = await Post.aggregate([
        {
          $match: {},
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: parseInt(offset),
        },
        {
          $limit: parseInt(limit),
        },
        {
          $addFields: {
            userHasLiked: {
              $in: [loggedInUserId, '$likes'],
            },
          },
        },
      ]);

      res.json({ posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching posts.' });
    }
  },

  getPostsByUser: async (req: IReqAuth, res: Response) => {
    try {
      const { offset = '0', limit = '10' } = req.query as unknown as IQuery;
      const userId = convertToObjectId(req.params.userId);

      const posts = await Post.aggregate([
        {
          $match: { userId: userId },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: parseInt(offset),
        },
        {
          $limit: parseInt(limit),
        },
        {
          $addFields: {
            userHasLiked: {
              $in: [userId, '$likes'],
            },
          },
        },
      ]);

      res.json({ posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user posts.' });
    }
  },

  getPostByFollowing: async (req: IReqAuth, res: Response) => {
    try {
      const { offset = '0', limit = '10' } = req.query as unknown as IQuery;

      const loggedInUserId: objectId = req.user?._id;

      const loggedInUser = await User.findById(loggedInUserId);

      const userIds = loggedInUser?.following;

      const posts = await Post.aggregate([
        {
          $match: { userId: { $in: userIds } },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: parseInt(offset),
        },
        {
          $limit: parseInt(limit),
        },
        {
          $project: {
            userHasLiked: {
              $in: [loggedInUserId, '$likes'],
            },
          },
        },
      ]);

      res.json({ posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching posts from followed users.' });
    }
  },

  like: async (req: IReqAuth, res: Response) => {
    try {
      const postId: string = req.params.postId;
      const loggedInUserId: objectId = req.user?._id;

      await Post.findByIdAndUpdate(postId, { $addToSet: { likes: loggedInUserId } });

      res.json({ message: 'You have liked the post.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error liking the post.' });
    }
  },

  unlike: async (req: IReqAuth, res: Response) => {
    try {
      const postId: string = req.params.postId;
      const loggedInUserId: objectId = req.user?._id;

      await Post.findByIdAndUpdate(postId, { $pull: { likes: loggedInUserId } });

      res.json({ message: 'You have unliked the post.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error unliking the post.' });
    }
  },

  getCommentsForPost: async (req: IReqAuth, res: Response) => {
    try {
      const postId: objectId = convertToObjectId(req.params.postId);
      const { offset = '0', limit = '10' } = req.query as unknown as IQuery;

      const comments = await Comment.aggregate([
        {
          $match: { postId: postId },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: parseInt(offset),
        },
        {
          $limit: parseInt(limit),
        },
      ]);

      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching comments for the post.' });
    }
  },
};

export default postController;
