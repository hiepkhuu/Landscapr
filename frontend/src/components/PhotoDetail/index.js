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

    useEffect(()=>{
      dispatch(getSinglePhoto(id))
    },[dispatch])

    if (!sessionUser) {
      return (
        <Redirect to='/login' />
      )
    }
    console.log(singlePhoto)

    if(!singlePhoto){
      return null;
    }

  return (
    <div className='singlephoto-detail-page'>
      <div className='singlephoto-container'>
          <img className='single-photo' src={singlePhoto.imageUrl}></img>
      </div>
      <div className='photo-detail-container'>
        <div className='photo-details'>
            <div>
              <h2>{singlePhoto.User?.username}</h2>
            </div>
            <div>
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
        </div>
      </div>

    </div>

  )
}

export default PhotoDetail;
