'use client';

import Button from '@/components/formComponents/Button';
import Header from '@/components/layout/header/Header';
import { useAppDispatch } from '@/hooks/typeHooks';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <div className="bg-gray-900 text-white">
      <Header showHeaderMenus={false} />
      <div className="min-h-screen">
        <h3 className="lg:text-9xl md:text-8xl text-5xl font-bold text-center">shlala social</h3>
        <h5 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-center -mt-24">
          one stop for all your social needs
        </h5>
        <div className="flex justify-center space-x-20 mt-40">
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
