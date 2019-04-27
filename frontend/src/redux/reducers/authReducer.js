import isEmpty from '../../common/utils/isEmpty';
import { SET_CURRENT_USER, GET_CURRENT_USER } from '../types';

const initialState = {
  isAuth: false,
  user: {}
};

// if the payload is empty set isAuth to false else to true
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
    case GET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
