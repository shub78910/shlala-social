import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IProps {
  image: string;
  caption: string;
  _id: string;
}
const UserPostsGrid = ({ posts }: { posts: IProps[] }) => {
  return (
    <div className="grid grid-cols-3 mt-14">
      {posts?.map((post: IProps) => {
        return (
          <Link href={`/post/${post._id}`}>
            <div className="m-1 flex justify-center bg-red-50 cursor-pointer">
              <Image
                src={post.image}
                alt={post.caption}
                height={100}
                width={100}
                layout="responsive"
                sizes="(max-width: 600px) 100vw, (max-width: 1023px) 50vw, 25vw)"
                className="object-cover max-h-32"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default UserPostsGrid;
