import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { Request, Response } from 'express';
import { generateAccessToken } from '../utils/generateAccessToken';

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const userData = { username: user.username, _id: user._id };

      const accessToken = generateAccessToken(userData);

      res.json({ message: 'Login successful', accessToken: accessToken });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshToken', { path: '/api/refreshToken' });
      return res.json({ message: 'Logged out' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);

      if (!userData) {
        return res.status(401).json({ message: 'Invalid refresh token.' });
      }

      const accessToken = generateAccessToken(userData);
      res.json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while refreshing the token.' });
    }
  },
};

export default authController;