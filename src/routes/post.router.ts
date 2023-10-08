import express from 'express';
import postController from '../controllers/post.controller';
import authMiddleware from '../middleware/auth.middleware';

const postRouter = express.Router();

postRouter.post('/post', authMiddleware, postController.createPost);
postRouter.patch('/post/:postId', authMiddleware, postController.updatePost);
postRouter.delete('/post/:postId', authMiddleware, postController.deletePost);

postRouter.get('/posts', authMiddleware, postController.getPosts);

postRouter.get('/posts/user/:userId', authMiddleware, postController.getPostsByUser);

postRouter.get('/posts/following', authMiddleware, postController.getPostByFollowing);

postRouter.post('/posts/like/:postId', authMiddleware, postController.like);
postRouter.post('/posts/unlike/:postId', authMiddleware, postController.unlike);

postRouter.get('/posts/comments/:postId', authMiddleware, postController.getCommentsForPost);
export default postRouter;
