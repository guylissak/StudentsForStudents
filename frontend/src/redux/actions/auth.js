import axios from 'axios';
import setJwtAutorization from '../../common/utils/setJwtAutorzation';
import jwt_decode from 'jwt-decode';
import store from '../store';
import { SERVER_URL } from '../../config';

import { GET_ERRORS, SET_CURRENT_USER, GET_CURRENT_USER, CLEAR_ERRORS } from '../types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${SERVER_URL}/api/users/register`, userData)
    .then(() => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get current user
export const getCurrentUser = () => dispatch => {
  axios
    .get(`${SERVER_URL}/api/users/current`)
    .then(res => {
      console.log(res)
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User JWT Token
export const loginUser = userData => dispatch => {
    axios
      .post(`${SERVER_URL}/api/users/login`, userData)
      .then(res => {
        // destruct the token, in the backend return res.data.token
        const { token } = res.data;
        // Set token to LS
        localStorage.setItem('jwtToken', token);
        // Set token to Authorization header
        setJwtAutorization(token);
        // Decode token to get user data
        const decodedPayload = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decodedPayload));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  // Set logged in user
  export const setCurrentUser = decodedPayload => {
    return {
      type: SET_CURRENT_USER,
      payload: decodedPayload
    };
  };
  
  // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setJwtAutorization(false);
    // Set current user to {} which will set isAuth to false
    dispatch(setCurrentUser({}));
  };

  export const clearErrors = () => {
      store.dispatch(clearErrs());
  }

  export const clearErrs = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
  