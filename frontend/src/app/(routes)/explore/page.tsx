'use client';

import FeedLayout from '@/components/layout/FeedLayout';
import Explore from './Explore';

const ExplorePage = () => {
  return (
    <FeedLayout>
      <div className="bg-gray-700 rounded" style={{ minHeight: '85vh' }}>
        <Explore />
      </div>
    </FeedLayout>
  );
};

export default ExplorePage;
