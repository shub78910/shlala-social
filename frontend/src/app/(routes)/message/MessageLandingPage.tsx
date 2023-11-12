import { useAppDispatch } from '@/hooks/typeHooks';
import { firstLoad } from '@/store/reducers/authSlice';
import { useEffect } from 'react';

const MessageLandingPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(firstLoad());
  }, []);
  return (
    <div className="text-white flex items-center justify-center">
      <div>
        <div>Shlala Messaging</div>
        <div>Chat or VC from your connections in an instant</div>
      </div>
    </div>
  );
};

export default MessageLandingPage;
