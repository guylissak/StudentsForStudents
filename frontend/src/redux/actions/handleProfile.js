import axios from 'axios';
import { SERVER_URL } from '../../config';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
//   SET_CURRENT_USER
} from '../types';
import { logoutUser } from '../actions/auth';

// Get current profile, in case the user does not have a profile send the reducer an empty object
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${SERVER_URL}/api/profiles`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
    return {
      type: PROFILE_LOADING
    };
  };

// Delete account & profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure you want to delete your account? once you click ok all of your information will be gone')) {
      axios
        .delete(`${SERVER_URL}/api/profiles`)
        .then(() => {
          dispatch(logoutUser());
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  };

// Clear profile
export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRENT_PROFILE
    };
  };

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post(`${SERVER_URL}/api/profiles`, profileData)
    .then(() => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`${SERVER_URL}/api/profiles/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post(`${SERVER_URL}/api/profiles/education`, eduData)
    .then(() => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${SERVER_URL}/api/profiles/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${SERVER_URL}/api/profiles/all`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

  
  