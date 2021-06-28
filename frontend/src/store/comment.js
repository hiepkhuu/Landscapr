import { csrfFetch } from './csrf'
import { UPDATE_PHOTO } from './photos';

export const LOAD_COMMENTS = "COMMENTS/LOAD_COMMENTS";
export const REMOVE_COMMENT = "COMMENTS/REMOVE_Comment";
export const UPDATE_COMMENT = "COMMENTS/UPDATE_Comment";
export const ADD_COMMENT = "COMMENTS/ADD_Comment";

const loadComments = comments => ({
  type: LOAD_COMMENTS,
  comments
})

const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
})

const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})

const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
})

/**THUNK - GET */
export const getComments = (id) => async dispatch => {
  const response = await csrfFetch(`api/comments/photos/${id}`)
  if(response.ok){
    const comments = await response.json();
    dispatch(loadComments(comments))
  }
}

/**THUNK ADD */
export const uploadComment = (data) => async dispatch => {
  const response = await csrfFetch(`/api/comments/photos/${data.id}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.ok){
    const createdData = await response.json();
    dispatch(addComment(createdData))
    return createdData
  }
}

/**THUNK UPDATE */
export const editComment = (data) => async dispatch => {
  const response = await csrfFetch(`/api/comments/photos/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if(response.ok){
    const createdData = await response.json();
    dispatch(updateComment(createdData))
    return createdData
  }
}


/**THUNK DELETE */
export const deleteComment = (id) => async dispatch =>{
  const response = await csrfFetch(`/api/comments/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (response.ok){
    const comment = await response.json();
    dispatch(removeComment(comment))
  }
}

const commentReducer = (state = {}, action) => {
  let allComments = {};
  switch (action.type){
    case LOAD_COMMENTS: {
      action.comment.forEach(comment => {
        allComments[comment.id] = comment;
      });
      return {
        ...allComments,
        ...state,
      }
    }
    case ADD_COMMENT: {
      const newState = {...state}
      newState[action.photo.id] = action.comment
      return newState
    }
    case UPDATE_COMMENT: {
      const newState = {...state}
      newState[action.comment.id] = action.comment
      return newState
    }
    case REMOVE_COMMENT: {
      const deleteComment = {...state}
      delete deleteComment[action.comment]
      return deleteComment
    }
    default:
      return state;
  }
}


export default commentReducer;
