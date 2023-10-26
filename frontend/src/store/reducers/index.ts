import { combineReducers } from 'redux';
import userReducer from './authSlice';
import postReducer from './postSlice';
import miscReducer from './miscSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  misc: miscReducer,
});

export default rootReducer;
