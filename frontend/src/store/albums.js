import { csrfFetch } from './csrf';

export const LOAD_ALBUMS = "albums/LOAD_ALBUMS";

const loadAlbums = albumList =>({
  type: LOAD_ALBUMS,
  albumList
})


export const getAlbums = () => async dispatch =>{
  const response = await csrfFetch(`/api/albums`)

  if (response.ok){
    const albums = await response.json();
    dispatch(loadAlbums(albums))
  }
}

const albumReducer = (state= {}, action)=>{
  let allAlbums = {};
  switch(action.type){
    case LOAD_ALBUMS: {
      action.albumList.forEach(album => {
        allAlbums[album.id] = album;
      });
      return {
        ...allAlbums,
        ...state,
      }
    }
    default:
      return state;
  }
}

export default albumReducer
