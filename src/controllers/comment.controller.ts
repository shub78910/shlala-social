import { IReqAuth, IUser, objectId } from '../config/interface';
import Comment from '../models/comment.model';
import { Response } from 'express';
import { convertToObjectId } from '../utils/convertToObjectId';
import Post from '../models/post.model';
import User from '../models/user.model';

const commentController = {
  addComment: async (req: IReqAuth, res: Response) => {
    try {
      const {
        text,
        parentCommentId = null,
        postId,
      }: {
        text: string;
        parentCommentId: string | null;
        postId: string;
      } = req.body;

      const userId = convertToObjectId(req.user?._id);

      const userDetails: IUser | null = await User.findById(userId);

      if (parentCommentId) {
        // It's a reply, create a new comment with parentComment reference
        const newComment = new Comment({
          text,
          userId,
          parentComment: parentCommentId,
          postId,
        });

        const savedComment = await newComment.save();

        // Update the parent comment to include the new reply
        await Comment.updateOne(
          { _id: parentCommentId },
          {
            $push: { replies: savedComment._id },
          },
        );

        // Add the comment ID to the corresponding post model
        await Post.updateOne(
          { _id: postId },
          {
            $push: { comments: savedComment._id },
          },
        );

        res.json({ savedComment, username: userDetails?.username, profilePicture: userDetails?.profilePicture });
      } else {
        // It's a top-level comment, create a new comment without parentComment reference
        const newComment = new Comment({
          text,
          userId,
          postId,
        });

        const savedComment = await newComment.save();

        // Add the comment ID to the corresponding post model
        await Post.updateOne(
          { _id: postId },
          {
            $push: { comments: savedComment._id },
          },
        );

        res.json({
          savedComment,
          userDetails: { username: userDetails?.username, profilePicture: userDetails?.profilePicture, _id: userId },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding comment.' });
    }
  },

  editComment: async (req: IReqAuth, res: Response) => {
    try {
      const commentId = req.params.commentId;
      const newText = req.body.text;

      const userId = convertToObjectId(req.user?._id);
      const userDetails: IUser | null = await User.findById(userId);

      const updatedComment = await Comment.findByIdAndUpdate(commentId, { text: newText }, { new: true });

      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }

      res.json({
        updatedComment,
        userDetails: { username: userDetails?.username, profilePicture: userDetails?.profilePicture, _id: userId },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error editing comment.' });
    }
  },

  deleteComment: async (req: IReqAuth, res: Response) => {
    try {
      const commentId = req.params.commentId;

      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }

      res.json({ message: 'Comment deleted.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting a comment.' });
    }
  },

  getCommentsByPostId: async (req: IReqAuth, res: Response) => {
    try {
      const postId = convertToObjectId(req.params.postId);
      const userId = convertToObjectId(req.user?._id);

      const commentsWithUserDetails: any = await Comment.aggregate([
        {
          $match: { postId: postId },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $addFields: {
            userDetails: {
              $arrayElemAt: ['$userDetails', 0],
            },
            isLiked: {
              $in: [userId, '$likes'],
            },
          },
        },
        {
          $project: {
            'userDetails.username': 1,
            'userDetails.profilePicture': 1,
            'userDetails._id': 1,
            isLiked: 1,
            text: 1,
            createdAt: 1,
            likes: 1,
            parentComment: 1,
          },
        },
      ]);

      res.json(commentsWithUserDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting comments.' });
    }
  },

  likeComment: async (req: IReqAuth, res: Response) => {
    try {
      const commentId: string = req.params.commentId;
      const userId: objectId = req.user?._id;

      await Comment.findByIdAndUpdate(commentId, { $addToSet: { likes: userId } });

      res.json({ message: 'Comment liked.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error liking comment.' });
    }
  },

  unlikeComment: async (req: IReqAuth, res: Response) => {
    try {
      const commentId: string = req.params.commentId;
      const userId: objectId = req.user?._id;

      await Comment.findByIdAndUpdate(commentId, { $pull: { likes: userId } });

      res.json({ message: 'Comment liked.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error liking comment.' });
    }
  },
};

export default commentController;
