import { csrfFetch } from './csrf';

export const LOAD_PHOTOS = "photos/LOAD_PHOTOS";
export const LOAD_SINGLE_PHOTO = "photos/LOAD_SINGLE_PHOTO"
export const REMOVE_PHOTOS = "photos/REMOVE_PHOTOS";
export const UPDATE_PHOTOS = "photos/UPDATE_PHOTOS";
export const ADD_PHOTO = "photos/ADD_PHOTO";

const loadPhotos = photoList => ({
  type: LOAD_PHOTOS,
  photoList
})

const loadSinglePhoto = photo => ({
  type: LOAD_SINGLE_PHOTO,
  photo
})

const addPhoto = photo => ({
  type: ADD_PHOTO,
  photo
})

export const uploadPhoto = (data) => async dispatch =>{
  const response = await csrfFetch(`/api/photos/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)

  })

  if (response.ok){
    const createdData = await response.json();
    dispatch(addPhoto(createdData))
    return createdData
  }
}


export const getPhotos = () => async dispatch =>{
  const response = await csrfFetch(`/api/photos`)

  if(response.ok){
    const photos = await response.json();
    dispatch(loadPhotos(photos))
  }
}

export const getSinglePhoto = (id) => async dispatch => {
  const response = await csrfFetch(`/api/photos/${id}`)
  if(response.ok){
    const photo = await response.json();
    dispatch(loadSinglePhoto(photo))
  }
}

// const initialState = {
//   list: []
// }

const photoReducer = (state = {}, action) => {
  let allPhotos = {};
  switch (action.type){
    case LOAD_PHOTOS: {
      action.photoList.forEach(photo => {
        allPhotos[photo.id] = photo;
      });
      return {
        ...allPhotos,
        ...state,
      }
    }
    case LOAD_SINGLE_PHOTO: {
      allPhotos[action.photo.id] = action.photo
      return allPhotos
    }
    case ADD_PHOTO: {
      const newState = {...state}
      newState[action.photo.id] = action.photo
      return newState
    }
    default:
      return state;
  }
}

export default photoReducer;
