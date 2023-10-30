'use client';

import { useAppDispatch } from '@/hooks/typeHooks';
import { firstLoad } from '@/store/reducers/authSlice';
import { getDataAPI } from '@/utils/axiosCall';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import PostDetail from './components/PostDetail';
import FeedLayout from '@/components/layout/FeedLayout';

function PostId() {
  return (
    <FeedLayout>
      <PostDetail />
    </FeedLayout>
  );
}

export default PostId;
