import { Document, Types } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  username: string;
  password: string;
  profilePicture: string;
  bio: string;
  posts: objectId[];
  followers: objectId[];
  following: objectId[];
}

export interface IReqAuth extends Request {
  user?: IUser;
}

export interface IQuery {
  offset: string;
  limit: string;
}

export type objectId = Types.ObjectId;
