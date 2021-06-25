import { csrfFetch } from './csrf';

export const LOAD_PHOTOS = "photos/LOAD_PHOTOS";
export const LOAD_SINGLE_PHOTO = "photos/LOAD_SINGLE_PHOTO"
export const REMOVE_PHOTO = "photos/REMOVE_PHOTO";
export const UPDATE_PHOTO = "photos/UPDATE_PHOTO";
export const ADD_PHOTO = "photos/ADD_PHOTO";

const loadPhotos = photoList => ({
  type: LOAD_PHOTOS,
  photoList
})

const updatePhoto = photo => ({
  type: UPDATE_PHOTO,
  photo
})

const loadSinglePhoto = photo => ({
  type: LOAD_SINGLE_PHOTO,
  photo
})

const removePhoto = photo => ({
  type: REMOVE_PHOTO,
  photo
})

const addPhoto = photo => ({
  type: ADD_PHOTO,
  photo
})

export const removeSinglePhoto = (id) => async dispatch =>{
  const response = await csrfFetch(`/api/photos/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if(response.ok){
    const photo = await response.json();

    dispatch(removePhoto(photo))
  }
}
export const updateSinglePhoto = (data) => async dispatch =>{
  const response = await csrfFetch(`/api/photos/${data.id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.ok){
    const createdData = await response.json();
    dispatch(updatePhoto(createdData))
    return createdData
  }
}

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
    case UPDATE_PHOTO: {
      const newState = {...state}
      newState[action.photo.id] = action.photo
      return newState
    }
    case REMOVE_PHOTO: {
      const newState = {...state}
    }
    default:
      return state;
  }
}

export default photoReducer;
