import { ILogin, IRegister } from '@/Interface/IAuth';
import { IUser } from '@/Interface/IUser';
import { loginUserAPI, registerUserAPI } from '@/api/auth.api';
import { formatError } from '@/utils/formatError';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Todo:
// maake a bunch of users with ea cric names before deploying

interface UserState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    registerUserRequest: (state) => {
      state.loading = true;
    },
    registerUserResponse: (state, payload) => {
      state.loading = false;
      state.user = payload.payload;
    },
    registerUserError: (state, payload: any) => {
      state.loading = false;
      state.error = payload.payload;
    },
    clearRegisterError: (state) => {
      state.error = '';
    },
    loginUserRequest: (state) => {
      state.loading = true;
    },
    loginUserResponse: (state, payload) => {
      state.loading = false;
      state.user = payload.payload;
    },
    loginUserError: (state, payload) => {
      state.loading = false;
      state.error = payload.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  registerUserRequest,
  registerUserResponse,
  registerUserError,
  clearRegisterError,
  loginUserRequest,
  loginUserResponse,
  loginUserError,
} = userSlice.actions;

export const registerUser = (userData: IRegister) => {
  return async (dispatch: (data: object) => void) => {
    try {
      dispatch(registerUserRequest());
      const res = await registerUserAPI(userData);
      dispatch(registerUserResponse(res.data.user));

      //store to local storage
    } catch (error: any) {
      dispatch(registerUserError(formatError(error)));
    }
  };
};

export const clearRegisterUserError = () => {
  return (dispatch: (data: object) => void) => {
    dispatch(clearRegisterError());
  };
};

export const loginUser = (userData: ILogin) => {
  return async (dispatch: (data: object) => void) => {
    try {
      dispatch(loginUserRequest());
      const res = await loginUserAPI(userData);

      localStorage.setItem('token', res.data.user.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(loginUserResponse(res.data.user));
    } catch (error: any) {
      dispatch(loginUserError(formatError(error)));
    }
  };
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const firstLoad = () => {
  const userDetails = JSON.parse(localStorage.getItem('user') ?? '');

  return (dispatch: (data: object) => void) => {
    dispatch(setUser(userDetails));
  };
};

export default userSlice.reducer;
