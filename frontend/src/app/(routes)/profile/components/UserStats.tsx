const UserStats = ({ followers, following, posts }: { followers: number; following: number; posts: number }) => {
  return (
    <div className="flex justify-evenly space-x-6 px-4 mt-4 text-center">
      <div className="bg-gray-600 p-2 rounded-md w-1/3">
        <span className="font-medium text-base">Followers</span>
        <div className="mt-2 text-3xl">{followers}</div>
      </div>
      <div className="bg-gray-600 p-2 rounded-md w-1/3">
        <span className="font-medium text-base">Following</span>
        <div className="mt-2 text-3xl">{following}</div>
      </div>
      <div className="bg-gray-600 p-2 rounded-md w-1/3">
        <span className="font-medium text-base">Posts</span>
        <div className="mt-2 text-3xl">{posts}</div>
      </div>
    </div>
  );
};

export default UserStats;
