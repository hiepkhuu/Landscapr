import {csrfFetch} from './csrf';

export const LOAD_USER = "users/LOAD_USER";

const loadUser = user => ({
  type: LOAD_USER,
  user
})


// USER DETAILS
export const getUser = (id) => async dispatch =>{
  const response = await csrfFetch(`/api/users/${id}`)
  if(response.ok){
    const user = await response.json();
    dispatch(loadUser(user))
  }
}

const userReducer = (state ={}, action)=>{
  let newState = {};
  switch (action.type) {
    case LOAD_USER:
      newState[action.user.id] = action.user;
      return newState;
    default:
      return state;
  }
};

export default userReducer;
