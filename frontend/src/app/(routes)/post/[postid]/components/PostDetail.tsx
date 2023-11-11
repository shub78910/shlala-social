'use client';

import Post from '@/components/post/Post';
import Loader from '@/components/Loader';
import When from '@/components/When';
import { useAppDispatch } from '@/hooks/typeHooks';
import { firstLoad } from '@/store/reducers/authSlice';
import { getDataAPI } from '@/utils/axiosCall';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

function PostDetail() {
  const params = useParams();
  const { postid } = params;

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    data: { data } = {},
    isLoading,
    refetch,
  }: {
    data: any;
    isLoading: boolean;
    refetch: any;
  } = useQuery(['post'], async () => await getDataAPI(`posts/${postid}`), {
    enabled: false,
  });

  useEffect(() => {
    dispatch(firstLoad());

    queryClient.fetchQuery(['post']);
  }, []);

  return (
    <div>
      <When isTrue={isLoading}>
        <div className="flex justify-center">
          <Loader />
        </div>
      </When>

      <When isTrue={!isLoading}>
        <Post
          {...{
            ...data?.post,
            refetch,
          }}
        />
      </When>
    </div>
  );
}

export default PostDetail;
