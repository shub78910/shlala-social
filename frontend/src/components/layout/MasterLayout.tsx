import React from 'react';
import When from '../When';
import Header from './Header';

const MasterLayout = ({
  children,
  showNav = true,
  showHeader = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  showNav?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}) => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <When isTrue={showHeader}>
        <Header />
      </When>

      <When isTrue={showNav}>
        <nav className="bg-gray-900 text-white p-2">NAVIGATION</nav>
      </When>

      <main className="flex-grow p-4">{children}</main>

      <When isTrue={showFooter}>
        <footer className="bg-gray-900 text-white p-4">FOOTER</footer>
      </When>
    </div>
  );
};

export default MasterLayout;
