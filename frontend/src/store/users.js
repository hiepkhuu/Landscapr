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
    dispatch(loadUser(id))
  }
}

const userReducer = (state ={}, action)=>{
  let newState;
  switch (action.type) {
    case LOAD_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userReducer;
