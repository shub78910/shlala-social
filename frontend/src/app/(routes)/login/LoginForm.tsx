import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidation from './login.validation';
import { useRouter } from 'next/navigation';
import Input from '@/components/formComponents/Input';
import Button from '@/components/formComponents/Button';
import { ILogin } from '@/Interface/IAuth';
import { RootState } from '@/store';
import { loginUser } from '@/store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/typeHooks';
import { useEffect } from 'react';
import When from '@/components/When';
import Error from '@/components/Error';
import { isEmpty } from 'ramda';
import ButtonWithSpinner from '@/components/formComponents/ButtonWithSpinner';

const LoginForm = () => {
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.user);
  const { loading, error, user: loggedInUser } = user;
  const dispatch = useAppDispatch();

  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = (data: ILogin) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (loggedInUser) router.push('/feed');
  }, [dispatch, loggedInUser]);

  return (
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
                  maxLength: 20,
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

        <When isTrue={!isEmpty(error)}>
          <Error>{error}</Error>
        </When>

        <ButtonWithSpinner
          className="bg-gray-700 mb-5 hover:bg-gray-800 text-white w-full"
          spinner={loading}
          {...{
            type: 'submit',
            onClick: () => {
              handleSubmit(onSubmit);
            },
            disabled: loading,
          }}
        >
          SIGN IN
        </ButtonWithSpinner>

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
  );
};

export default LoginForm;
