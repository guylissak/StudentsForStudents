import { CHANGE_SEARCH_FIELD } from '../types';

export const setSearchField = (text) => 
{
    return ({        
    type: CHANGE_SEARCH_FIELD,
    payload: text
    })
}

export const searchStudentsBySkills = (text) => dispatch => {
    dispatch(setSearchField(text));
}