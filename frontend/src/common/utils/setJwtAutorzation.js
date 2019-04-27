import axios from 'axios';

const setJwtAutorization = token => {
  token ?
    // Set the JWT in the auth header for future requests
    axios.defaults.headers.common['Authorization'] = token
    :
    // Delete auth header
    delete axios.defaults.headers.common['Authorization']
  
};

export default setJwtAutorization;
