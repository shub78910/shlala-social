import { IPost } from '@/Interface/IPost';
import { getDataAPI } from '@/utils/axiosCall';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PostState {
  posts: IPost[];
  loading: boolean;
  error: string;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state: PostState, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
