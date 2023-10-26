'use client';

import Posts from '@/app/(routes)/feed/components/Posts';
import FeedLayout from '@/components/layout/FeedLayout';

const FeedPage = () => {
  return (
    <FeedLayout>
      <div className="bg-gray-700 rounded" style={{ minHeight: '85vh' }}>
        <Posts />
      </div>
    </FeedLayout>
  );
};

export default FeedPage;
