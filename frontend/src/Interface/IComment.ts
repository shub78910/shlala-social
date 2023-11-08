export interface ICommentResponse {
  text: string;
  createdAt: string;
  postId: string;
  _id: string;
  likes: string[];
  parentComment?: string;
  userDetails?: {
    username: string;
    profilePicture: string;
  };
}
