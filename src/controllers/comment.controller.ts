import { IReqAuth } from '../config/interface';
import Comment from '../models/comment.model';
import { Response } from 'express';

const commentController = {
  addComment: async (req: IReqAuth, res: Response) => {
    try {
      const {
        text,
        parentCommentId = null,
        userId,
        postId,
      }: {
        text: string;
        parentCommentId: string | null;
        userId: string;
        postId: string;
      } = req.body;

      if (parentCommentId) {
        // It's a reply, create a new comment with parentComment reference
        const newComment = new Comment({
          text,
          userId,
          parentComment: parentCommentId,
          postId,
        });

        await newComment.save();

        // Update the parent comment to include the new reply
        await Comment.updateOne(
          { _id: parentCommentId },
          {
            $push: { replies: newComment._id },
          },
        );

        res.json(newComment);
      } else {
        // It's a top-level comment, create a new comment without parentComment reference
        const newComment = new Comment({
          text,
          userId,
          postId,
        });

        await newComment.save();

        // Todo:
        // maybe we can save one or two comments in the post model as well, to show initially and then we can load more comments when the user clicks on the "load more comments" button

        res.json(newComment);
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

      const updatedComment = await Comment.findByIdAndUpdate(commentId, { text: newText }, { new: true });

      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }

      res.json(updatedComment);
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

  // Todo:
  // like a comment
};

export default commentController;
