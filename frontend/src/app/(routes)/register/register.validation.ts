import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  username: yup
    .string()
    .required('Username is required')
    .max(20, 'Username must be at most 20 characters')
    .min(3, 'Username must be at least 3 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  // .matches('/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/', 'Password must contain a number'),
});