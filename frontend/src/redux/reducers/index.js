import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import handleProfileReducer from './handleProfileReducer';
import searchReducer from './searchReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  handleProfile: handleProfileReducer,
  searchStudent: searchReducer,
  post: postReducer
});