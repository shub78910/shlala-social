'use client';

import FooterMenus from '@/components/layout/FooterMenus';
import MasterLayout from '@/components/layout/MasterLayout';
import SidebarMenus from '@/components/layout/SidebarMenus';

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MasterLayout>
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:px-44">
        <div
          className="w-full hidden md:block md:w-1/5 md:p-4 text-white bg-gray-700 rounded-md sticky top-20"
          style={{ height: '80vh' }}
        >
          <SidebarMenus />
        </div>

        <div className="bg-blue-500 w-full fixed bottom-0 md:hidden p-4">
          <FooterMenus />
        </div>

        <div className="w-full md:w-3/5 h-auto">
          <main>{children}</main>
        </div>

        <div
          className="w-full md:w-1/5 sticky z-20 top-20 text-white bg-gray-700 p-4 rounded shadow"
          style={{ height: '80vh' }}
        >
          Suggested Users Suggested Users Suggested Users Suggested Users Suggested Users Suggested Users Suggested
          Users Suggested Users Suggested Users Suggested Users Suggested Users Suggested Users Suggested Users
          Suggested Users
        </div>
      </div>
    </MasterLayout>
  );
};

export default FeedLayout;
