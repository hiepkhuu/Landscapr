import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ExplorePhotoStream.css';
import {getPhotos} from '../../store/photos'



const ExplorePhotoStream =() => {


  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPhotos())
  },[dispatch])

  const photos = useSelector(state => {
   return Object.values(state.photos)
  })
  // const photo = useSelector(state => {
  //   return state.photos.list.map(photoId=> state.photos[photoId])
  // })

 console.log('this migt owrk', photos)

 if(!photos) return null;

  return (
    <div class='photo-container'>
      {photos.map((photo)=>(
        <div class='photo-card'>
          <img class='each-photo' src={photo.imageUrl} />
          {/* <Link ></Link> */}
        </div>

      ))}
    </div>

  )
}

export default ExplorePhotoStream
