import { csrfFetch } from './csrf';

export const LOAD_PHOTOS = "photos/LOAD_PHOTOS";
export const REMOVE_PHOTOS = "photos/REMOVE_PHOTOS";
export const UPDATE_PHOTOS = "photos/UPDATE_PHOTOS";
export const ADD_PHOTOS = "photos/ADD_PHOTOS";

const loadPhotos = photoList => ({
  type: LOAD_PHOTOS,
  photoList
})

export const getPhotos = () => async dispatch =>{
  const response = await csrfFetch(`/api/photos`)

  if(response.ok){
    const photos = await response.json();
    dispatch(loadPhotos(photos))

  }
}

// const initialState = {
//   list: []
// }

const photoReducer = (state = {}, action) => {
  switch (action.type){
    case LOAD_PHOTOS: {
      const allPhotos = {};
      action.photoList.forEach(photo => {
        allPhotos[photo.id] = photo;
      });
      return {
        ...allPhotos,
        ...state,
      }
    }
    default:
      return state;
  }
}

export default photoReducer;
