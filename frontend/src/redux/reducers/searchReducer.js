import { CHANGE_SEARCH_FIELD } from '../types';

const initialState = {
    searchField : ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return {
          ...state,
          searchField: action.payload
      }
    default:
      return state;
  }
}