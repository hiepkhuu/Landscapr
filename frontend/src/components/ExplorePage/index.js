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
      <div className='behind-nav'></div>
        <div className='explore-space-div'>Explore</div>
        <div className='explore-gallery-container'>

          <div className= 'photo-container'>
          {photos.map((photo) => (
            <div key={photo.id} className='photo-card'>
               <a href={`/photos/${photo.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/photos/${photo.id}`)
                }}>
                   <img src={photo.imageUrl} />
               </a>
             </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default ExplorePage
