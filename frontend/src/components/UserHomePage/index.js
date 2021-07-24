import React, { useEffect } from 'react';
import { useHistory, Redirect, useParams, Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './UserHomePage.css';
import { getPhotos } from '../../store/photos'
import PhotoDetail from '../PhotoDetail';
import { getUser } from '../../store/users';



const UserHomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {userId} = useParams();
  const history = useHistory();

    useEffect(() => {
    dispatch(getPhotos())
    dispatch(getUser(Number(userId)))
  }, [dispatch,userId])

  const userPhotos = useSelector(state => {
    return Object.values(state.photos)
  })

  const userInfo = useSelector(state => {
    return Object.values(state.user)
  })

    const filtereduserPhotos = userPhotos.filter(eachItem => eachItem.userId === Number(userId))


  const photos = useSelector(state => {
    return Object.values(state.photos)
  })


  if (!photos) return null;

  if (!sessionUser){
    return(
      <Redirect to='/login' />
    )
  }



  return (
    <div className='user-page'>
      <div className='user-space-div'>
      {userInfo.map((user)=>(
        <div className='user-info-header'>
          <p className='profile-headshot'></p>
          <div>
           <h1>{user.firstName} {user.lastName}</h1>
           <p className='username-div'>{user.username}</p>
          </div>
        </div>
      ))}
      </div>
      <div className='sub-nav'>
        <div >
          <NavLink className='sub-nav albums' to={`/${sessionUser.username}/${sessionUser.id}/albums`}>Albums</NavLink>
        </div>
        <div >
          <NavLink className='sub-nav photos' id='click-photo' to={`/${sessionUser.username}/${sessionUser.id}`} >Photo Stream</NavLink>
        </div>
      </div>
      <div className='user-gallery-container'>
        <div className='user-photo-container'>
           {filtereduserPhotos.map((photo) => (
              <div key={photo.id} className='user-photo-card'>
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

export default UserHomePage;
