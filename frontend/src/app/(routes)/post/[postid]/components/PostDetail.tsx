'use client';

import Post from '@/app/(routes)/feed/components/Post';
import Loader from '@/components/Loader';
import When from '@/components/When';
import { useAppDispatch } from '@/hooks/typeHooks';
import { firstLoad } from '@/store/reducers/authSlice';
import { getDataAPI } from '@/utils/axiosCall';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

function PostDetail() {
  const params = useParams();
  const { postid } = params;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(firstLoad());
  }, []);

  const {
    data: { data } = {},
    isLoading,
    refetch,
  }: {
    data: any;
    isLoading: boolean;
    refetch: any;
  } = useQuery(['posts'], async () => await getDataAPI(`posts/${postid}`));

  //@ts-ignore
  const { post: { userName, userImage, caption, createdAt, image, likeCount, _id, userHasLiked } = {} } = data ?? {};

  return (
    <div>
      <When isTrue={isLoading}>
        <div className="flex justify-center">
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
        <Post
          {...{
            userName,
            userImage,
            caption,
            createdAt,
            image,
            likeCount,
            _id,
            userHasLiked,
            refetch,
          }}
        />
      </When>
    </div>
  );
}

export default PostDetail;
