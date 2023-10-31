import Image from 'next/image';
import shlalaLogo from '../../../../public/icons/shlalaLogo.png';
import HeaderMenus from './HeaderMenus';
import When from '@/components/When';

const Header = ({ showHeaderMenus }: { showHeaderMenus: boolean }) => {
  return (
    <div className="flex justify-between items-center sticky z-50 top-0 bg-gray-600 rounded-t-none rounded-b-lg">
      <div className="flex items-center">
        <Image src={shlalaLogo} width={60} height={60} alt="shlalaLogo" />
        {/* // change styles */}
        <span className="text-white font-semibold text-lg font-mono hidden md:inline">Shlala</span>
      </div>
      <When isTrue={showHeaderMenus}>
        <div className="p-4">
          <HeaderMenus />
        </div>
      </When>
    </div>
  );
};

export default Header;
