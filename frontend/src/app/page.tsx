'use client';

import Button from '@/components/formComponents/Button';
import Header from '@/components/layout/header/Header';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <div className="bg-gray-900 text-white">
      <Header showHeaderMenus={false} />
      <div className="min-h-screen mt-48 flex flex-col items-center gap-6">
        <div className="lg:text-9xl md:text-8xl text-6xl font-bold text-center">shlala social</div>
        <div className="lg:text-4xl md:text-3xl text-2xl font-normal w-2/3 text-center">
          one stop for all your social needs.
        </div>
        <div className="flex justify-center space-x-20 mt-2 md:mt-40">
          <Button
            className="w-60 bg-gray-50 text-black px-12 py-2 text-2xl rounded-xl cursor-pointer font-semibold"
            {...{
              onClick: handleClick,
            }}
          >
            JOIN NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
