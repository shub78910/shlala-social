import express from 'express';

import commentController from '../controllers/comment.controller';

const commentRouter = express.Router();

commentRouter.post('/comment', commentController.addComment);
commentRouter.patch('/comment/:commentId', commentController.editComment);
commentRouter.delete('/comment/:commentId', commentController.deleteComment);

export default commentRouter;
