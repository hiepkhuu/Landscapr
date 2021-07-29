import React, { useEffect } from 'react';
import { useHistory, Redirect, useParams,Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotos } from '../../store/photos'
import PhotoDetail from '../PhotoDetail';
import { getUser } from '../../store/users';
//uses UserHomePage css
import './Albums.css'
import { getAlbums } from '../../store/albums';

const UserAlbums = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  let {userId} = useParams();
  userId = Number(userId)
  const history = useHistory();

    useEffect(() => {
    dispatch(getPhotos())
    dispatch(getUser(Number(userId)))
    dispatch(getAlbums())
  }, [dispatch,userId])

  const userPhotos = useSelector(state => {
    return Object.values(state.photos)
  })

  const albums = useSelector(state => {
    return Object.values(state.albums)
  })

  const filteredAlbums = albums.filter(album => album.userId === userId)
  console.log(filteredAlbums)
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
      <div>
          <NavLink className='sub-nav albums' id='click-album' to={`/${sessionUser.username}/${sessionUser.id}/albums`}>Albums</NavLink>
        </div>
        <div>
          <NavLink className='sub-nav photos' to={`/${sessionUser.username}/${sessionUser.id}`} >Photo Stream</NavLink>
        </div>
      </div>
      <div className='album-gallery-container'>
        <div className='album-container'>
           {filteredAlbums.map((album) => (
              <div className='user-album-card'>
                {/* <a href={`/photos/${photo.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/photos/${photo.id}`)
                  }}> */}
                  <div className='album-photo-cover'>photo cover goes here</div>
                  <div className='album-card-info'>
                    <p>{album.title}</p>
                    <p>{album.caption}</p>
                  </div>

                {/* </a> */}
              </div>
            ))}
            <button className='user-album-card'>
                  <div className='album-photo-cover'>add Album</div>
                  <div className='album-card-info'>
                    {/* <p>ittle</p>
                    <p>caption</p> */}
                  </div>
            </button>
         </div>
      </div>
    </div>
  )
}

export default UserAlbums;
