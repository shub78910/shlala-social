import express from 'express';

import authController from '../controllers/auth.controller';

const userRouter = express.Router();

userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);
userRouter.get('/refreshToken', authController.refreshToken);
userRouter.get('/logout', authController.logout);

// Todo:
// forgot password
// reset password

export default userRouter;
