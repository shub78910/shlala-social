import express from 'express';

import commentController from '../controllers/comment.controller';
import authMiddleware from '../middleware/auth.middleware';

const commentRouter = express.Router();

commentRouter.post('/comment', authMiddleware, commentController.addComment);
commentRouter.patch('/comment/:commentId', authMiddleware, commentController.editComment);
commentRouter.delete('/comment/:commentId', authMiddleware, commentController.deleteComment);
commentRouter.get('/comment/:postId', authMiddleware, commentController.getCommentsByPostId);

export default commentRouter;
