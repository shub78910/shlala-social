const UserStats: React.FC = () => {
  return (
    <div className="flex space-x-6 px-4 mt-4">
      <div>
        <span className="font-medium text-xl">Followers</span>
        <div>100K</div>
      </div>
      <div>
        <span className="font-medium text-xl">Following</span>
        <div>200</div>
      </div>
      <div>
        <span className="font-medium text-xl">Posts</span>
        <div>500</div>
      </div>
    </div>
  );
};

export default UserStats;
