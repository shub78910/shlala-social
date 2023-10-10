import Image from 'next/image';
import shlalaLogo from '../../../public/icons/shlalaLogo.png';

const Header = () => {
  return (
    <div className="lg:pt-2 pt-1 lg:pl-4 pl-2">
      <Image src={shlalaLogo} width={80} height={80} alt="shlalaLogo" className="text-white" />
    </div>
  );
};

export default Header;
