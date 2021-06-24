import React, { useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ExplorePage.css';
import { getPhotos } from '../../store/photos'
import PhotoDetail from '../PhotoDetail';



const ExplorePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  const photos = useSelector(state => {
    return Object.values(state.photos)
  })

  if (!photos) return null;

  if (!sessionUser){
    return(
      <Redirect to='/login' />
    )
  }

  // const routeToSinglePhoto = (e) => {
  //   e.preventDefault();
  //   history.push(`/photos/${photo.id}`)
  // }


  return (
    <div className='explore-page'>
        <div className='explore-gallery-container'>
          {photos.map((photo) => (
            <div key={photo.id} className='photo-container'>
               <a href={`/photos/${photo.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/photos/${photo.id}`)
                }}>
                 <div className='photo-card'>
                   <img className='each-photo' src={photo.imageUrl} />
                 </div>

               </a>
            </div>
            ))}
        </div>
    </div>
  )
}

export default ExplorePage
