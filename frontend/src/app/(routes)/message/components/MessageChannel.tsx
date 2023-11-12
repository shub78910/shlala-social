import { useAppDispatch } from '@/hooks/typeHooks';
import { firstLoad } from '@/store/reducers/authSlice';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const MessageChannel = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(firstLoad());
  }, []);

  const { messageId } = useParams();

  return (
    <div>
      <h1>MessageChannel {messageId}</h1>
    </div>
  );
};

export default MessageChannel;
