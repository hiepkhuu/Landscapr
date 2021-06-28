import React, {useEffect} from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePhoto } from '../../store/photos';
import './PhotoDetail.css'


const PhotoDetail = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const singlePhoto = useSelector(state => state.photos[id]);
    // const photo = useSelector(state => {
    //   return Object.values(state.photos)
    // })

    useEffect(()=>{
      dispatch(getSinglePhoto(id))
    },[dispatch])

    if (!sessionUser) {
      return (
        <Redirect to='/login' />
      )
    }
   

    if(!singlePhoto){
      return null;
    }

    const directToEditPage = () =>{
      history.push(`/edit/${singlePhoto.id}`)
    }

    const redirectToHomepage = () =>{
      history.push(`/${sessionUser.username}/${sessionUser.id}`)
    }

  return (
    <div className='singlephoto-detail-page'>
      <div className='singlephoto-container'>
          <img className='single-photo' src={singlePhoto.imageUrl}></img>
      </div>
      <div className='photo-detail-container'>
        <div className='photo-details'>
            <div>
              <div>
                <h2>This should be username</h2>
              </div>
              <div>
                <h4>{singlePhoto.title}</h4>
              </div>
              <div>
                <p>{singlePhoto.description}</p>
              </div>
            </div>
            <div className='comment-container'>
              <p>comment section</p>
            </div>
            <button
            onClick={directToEditPage}
            >Edit Photo</button>
            <button
            onClick={redirectToHomepage}
            >Back to Homepage</button>
        </div>
      </div>

    </div>

  )
}

export default PhotoDetail;
