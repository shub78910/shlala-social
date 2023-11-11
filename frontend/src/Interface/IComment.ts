export interface ICommentResponse {
  text: string;
  createdAt: string;
  postId: string;
  _id: string;
  likes: string[];
  parentComment?: string;
  isLiked: boolean;
  userDetails?: {
    username: string;
    profilePicture: string;
    _id: string;
  };
}

export interface IComment {
  text: string;
  parentCommentId?: string;
  postId: string;
}
