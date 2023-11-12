import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.patch('/user/follow/:userId', authMiddleware, userController.follow);

userRouter.patch('/user/unFollow/:userId', authMiddleware, userController.unfollow);

userRouter.get('/user/getUser/:userId', authMiddleware, userController.getUser);

userRouter.get('/user/searchUser', authMiddleware, userController.searchUser);

userRouter.patch('/user/editUser', authMiddleware, userController.editUser);

// Todo:
// controllers for follow req sent and accepted
export default userRouter;
