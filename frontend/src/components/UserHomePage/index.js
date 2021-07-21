import React, { useEffect } from 'react';
import { useHistory, Redirect, useParams } from 'react-router-dom';
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
  console.log('#######',userInfo)
    // console.log(typeof Number(userId))
    // userPhotos.map(eachItem => {
    //  console.log(typeof eachItem.userId)
    // })

    const filtereduserPhotos = userPhotos.filter(eachItem => eachItem.userId === Number(userId))

  // console.log(filtereduserPhotos)
  // userPhotos.map(eachItem =>{
  //   if (eachItem.userId === Number(userId)){
  //     console.log('is this whate i loooking for',eachItem.imageUrl)
  //   }
  // })



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
    <div className='user-page'>
      <div className='user-space-div'></div>
      {userInfo.map((user)=>(
        <div className='user-info-header'>
        <p>{user.username}</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.email}</p>
        </div>
      ))}
        <div className='user-gallery-container'>
          {filtereduserPhotos.map((photo) => (
                <div key={photo.id} className='user-photo-container'>
                  <a href={`/photos/${photo.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/photos/${photo.id}`)
                    }}>
                    <div className='user-photo-card'>
                      <img src={photo.imageUrl} />
                    </div>

                  </a>
                </div>
            ))}
        </div>
    </div>

  )
}

export default UserHomePage;
