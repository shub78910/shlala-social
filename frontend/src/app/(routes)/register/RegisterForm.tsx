import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerValidation from './register.validation';
import { useRouter } from 'next/navigation';
import Input from '@/components/formComponents/Input';
import Button from '@/components/formComponents/Button';
import { IRegister } from '@/Interface/IAuth';
import { clearRegisterUserError, registerUser } from '@/store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/typeHooks';
import ButtonWithSpinner from '@/components/formComponents/ButtonWithSpinner';
import { useEffect } from 'react';
import When from '@/components/When';
import { isEmpty } from 'ramda';
import Error from '@/components/Error';

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(registerValidation),
  });

  const user = useAppSelector((state) => state.user);
  const { loading, error, user: registeredUser } = user;

  const onSubmit = (data: IRegister) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (registeredUser) router.push('/');
  }, [dispatch, registeredUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6">
        <div className="mb-4 mr-4">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                className="w-full"
                {...field}
                placeholder="Enter Email"
                {...{
                  name: 'email',
                }}
                errors={formState.errors}
              />
            )}
          />
        </div>

        <div className="mb-4 mr-4">
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                className="w-full"
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
                className="w-full"
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
          className="bg-gray-700 mb-5 hover:bg-gray-800 w-full text-white"
          spinner={loading}
          {...{
            type: 'submit',
            onClick: () => {
              handleSubmit(onSubmit);
            },
            disabled: loading,
          }}
        >
          SIGN UP
        </ButtonWithSpinner>

        <div className="mt-5 text-right mb-16">
          <span className="pr-3">Already have an account?</span>
          <Button
            className="text-white bg-gray-800 hover:bg-gray-900"
            {...{
              type: 'button',
              onClick: () => {
                dispatch(clearRegisterUserError());
                router.push('/login');
              },
              disabled: loading,
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
