import { ILogin, IRegister } from '@/Interface/IAuth';
import { postDataAPI } from '@/utils/axiosCall';

export const registerUserAPI = (userData: IRegister) => {
  return postDataAPI(`register`, userData);
};

export const loginUserAPI = (userData: ILogin) => {
  return postDataAPI(`login`, userData);
};

// forget pass
// refresh token
