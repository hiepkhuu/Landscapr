import { csrfFetch } from './csrf'


const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
 const REMOVE_COMMENT = "comments/REMOVE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const ADD_COMMENT = "comments/ADD_COMMENT";
const GET_SINGLE_COMMENT = "comments/GET_SINGLE_COMMENT"

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

const getSingleComment = comment => ({
  type: GET_SINGLE_COMMENT,
  comment
})

/**THUNK - GET */
export const getComments = (id) => async dispatch => {
  const response = await csrfFetch(`/api/comments/photos/${id}`)
  if(response.ok){
    const comments = await response.json();
    dispatch(loadComments(comments))
    return comments
  }
}

/** THUNK_GET SINGLE COMMENT */

export const loadSingleComment = (id) => async dispatch => {
  const response = await csrfFetch(`/api/comments/photos/${id}`)
  if(response.ok){
    const comment = await response.json();
    dispatch(getSingleComment(comment))
  }
}

/**THUNK ADD */
export const uploadComment = (data) => async dispatch => {
  const response = await csrfFetch(`/api/comments/photos/${data.photoId}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.ok){
    const createdData = await response.json();
    dispatch(addComment(createdData))
    // return createdData
  }
}

/**THUNK UPDATE */
export const editComment = (data) => async dispatch => {
  const response = await csrfFetch(`/api/comments/${data.id}`, {
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
  })

  if (response.ok){
    dispatch(removeComment(id))
  }
}

const commentReducer = (state = {}, action) => {
  let allComments = {};
  switch (action.type){
    case LOAD_COMMENTS: {
      action.comments.forEach(comment => {
        allComments[comment.id] = comment;
      });
      return {
        ...allComments,
        ...state,
      }
    }
    case GET_SINGLE_COMMENT: {
      allComments[action.comment.id] = action.comment
      return allComments
    }
    case ADD_COMMENT: {
      const newState = {...state}
      newState[action.comment.id] = action.comment
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
