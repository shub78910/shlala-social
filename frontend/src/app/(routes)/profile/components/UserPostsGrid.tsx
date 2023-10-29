import Image from 'next/image';
import React from 'react';

interface IProps {
  image: string;
  caption: string;
}
const UserPostsGrid = ({ posts }: { posts: IProps[] }) => {
  return (
    <div className="grid grid-cols-3 mt-14">
      {posts?.map((post: IProps) => {
        return (
          <div className="m-1 flex justify-center bg-red-50">
            <Image src={post.image} alt={post.caption} height={150} width={200} className="object-cover" />
          </div>
        );
      })}
    </div>
  );
};

export default UserPostsGrid;
