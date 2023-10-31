'use client';

import Post from '../../../components/post/Post';
import { useQuery } from '@tanstack/react-query';
import { getDataAPI } from '@/utils/axiosCall';
import { useAppDispatch } from '@/hooks/typeHooks';
import { firstLoad } from '@/store/reducers/authSlice';
import { useEffect } from 'react';
import { setPosts } from '@/store/reducers/postSlice';
import When from '../../../components/When';
import Loader from '../../../components/Loader';
const Posts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(firstLoad());
  }, []);

  const {
    data: { data } = {},
    isLoading,
  }: {
    data: any;
    isLoading: boolean;
  } = useQuery(['posts'], async () => await getDataAPI(`posts/following/?offset=0&limit=10`));

  if (data) {
    dispatch(setPosts(data.posts));
  }

  return (
    <div className="flex justify-center space-x-4">
      <When isTrue={isLoading}>
        <div className="text-center flex justify-center items-center mt-32">
          <Loader
            {...{
              height: '100',
              width: '100',
              radius: 1,
              color: '#f8fafc',
            }}
          />
        </div>
      </When>
      <When isTrue={!isLoading}>
        <div className="w-full">{data?.posts?.map((post: any, index: number) => <Post key={index} {...post} />)}</div>
      </When>
    </div>
  );
};

export default Posts;
