'use client';

import React, { useEffect } from 'react';
import When from '../When';
import Header from './header/Header';
import ReduxProvider from '@/store/ReduxProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MasterLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  showHeaderMenus = true,
}: {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showHeaderMenus?: boolean;
}) => {
  const queryClient = new QueryClient();

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <div className="bg-gray-900 flex flex-col min-h-screen">
          <When isTrue={showHeader}>
            <Header showHeaderMenus={showHeaderMenus} />
          </When>

          <main className="p-2">{children}</main>

          {/* <When isTrue={showFooter}>
          <footer className="bg-gray-900 text-white">FOOTER</footer>
        </When> */}
        </div>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default MasterLayout;
