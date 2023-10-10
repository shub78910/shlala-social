'use client';

import MasterLayout from '@/components/layout/MasterLayout';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidation from './login.validation';
import { useRouter } from 'next/navigation';
import Input from '@/components/formComponents/Input';
import Button from '@/components/formComponents/Button';
import { ILogin } from '@/Interface/IAuth';

const Login = () => {
  const router = useRouter();

  const { handleSubmit, control, formState, setError } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = (data: ILogin) => {
    console.log('submitting');

    console.log(data);
  };

  return (
    <MasterLayout showNav={false} showFooter={false}>
      <div className="flex justify-center h-full">
        <div className="lg:w-1/4 md:w-2/6 w-full bg-gray-600 text-white p-5 rounded-3xl shadow-lg shadow-black ">
          <h4 className="font-semibold mt-16 text-2xl">Sign In</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6">
              <div className="mb-4 mr-4">
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Username"
                      {...{
                        name: 'username',
                      }}
                      errors={formState.errors}
                    />
                  )}
                />
              </div>

              <div className="mb-4 mr-4">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Password"
                      {...{
                        type: 'password',
                        name: 'password',
                      }}
                      errors={formState.errors}
                    />
                  )}
                />
              </div>

              <Button
                className="bg-gray-700 mb-5 hover:bg-gray-800 text-white w-full"
                {...{
                  type: 'submit',
                  onClick: () => {
                    handleSubmit(onSubmit);
                  },
                }}
              >
                SIGN IN
              </Button>

              <div className="mt-5 text-right mb-16">
                <span className="pr-3">Don't have an account?</span>
                <Button
                  className="text-white bg-gray-800 hover:bg-gray-900"
                  {...{
                    type: 'button',
                    onClick: () => {
                      router.push('/register');
                    },
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MasterLayout>
  );
};

export default Login;
