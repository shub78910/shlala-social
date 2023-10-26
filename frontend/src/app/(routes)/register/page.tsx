'use client';

import MasterLayout from '@/components/layout/MasterLayout';
import RegisterForm from './RegisterForm';

const Register: React.FC = () => {
  return (
    <MasterLayout showFooter={false} showHeaderMenus={false}>
      <div className="flex justify-center h-full">
        <div className="lg:w-1/4 md:w-2/6 w-full bg-gray-600 text-white p-5 rounded-3xl shadow-lg shadow-black ">
          <h4 className="font-semibold mt-16 text-2xl">Sign Up</h4>
          <RegisterForm />
        </div>
      </div>
    </MasterLayout>
  );
};

export default Register;
