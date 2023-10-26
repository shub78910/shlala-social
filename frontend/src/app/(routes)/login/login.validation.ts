import * as yup from 'yup';

export default yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .max(20, 'Username must be at most 20 characters')
    .min(3, 'Username must be at least 3 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});
