import { csrfFetch } from './csrf'
import { UPDATE_PHOTO } from './photos';

export const LOAD_COMMENTS = "COMMENTS/LOAD_COMMENTS";
export const REMOVE_COMMENT = "COMMENTS/REMOVE_Comment";
export const UPDATE_COMMENT = "COMMENTS/UPDATE_Comment";
export const ADD_COMMENT = "COMMENTS/ADD_Comment";

const loadCommentss = comments => ({
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
    case ADD_PHOTO: {
      const newState = {...state}
      newState[action.photo.id] = action.photo
      return newState
    }
    case REMOVE_COMMENT: {

    }
    default:
      return state;
  }
}
