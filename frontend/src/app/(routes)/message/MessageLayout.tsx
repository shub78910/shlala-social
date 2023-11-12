import MasterLayout from '@/components/layout/MasterLayout';
import MessageLandingPage from './MessageLandingPage';
import UsersList from './components/UsersList';
import When from '@/components/When';

interface IMessageLayoutProps {
  children?: React.ReactNode;
}
const MessageLayout: React.FC<IMessageLayoutProps> = ({ children }) => {
  return (
    <MasterLayout>
      <div className="flex">
        <UsersList />
        <div className="flex-grow">
          <When isTrue={!children}>
            <MessageLandingPage />
          </When>
          <When isTrue={!!children}>
            <div>{children}</div>
          </When>
        </div>
      </div>
    </MasterLayout>
  );
};

export default MessageLayout;
