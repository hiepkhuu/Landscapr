import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { getSinglePhoto, removeSinglePhoto, updateSinglePhoto } from '../../store/photos';

import './PhotoEditPage.css'


const PhotoEditPage = () =>{
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const {id} = useParams();

  const sessionUser = useSelector(state => state.session.user)
  const singlePhoto = useSelector(state => state.photos[id]);

  useEffect(() => {
    dispatch(getSinglePhoto(id))
  }, [dispatch])

  if (!sessionUser) {
    return (
      <Redirect to='/login' />
    )
  }

  const handleSubmit = async (e) =>{
    // e.preventDefault();
    const photoData = {
      ...singlePhoto,
      title,
      description,
      userId: sessionUser.id
    }
    const editedPhoto = await dispatch(updateSinglePhoto(photoData))
    if (editedPhoto) {
      setTitle('');
      setDescription('');
      // history.push(`/photos/${editedPhoto.id}`)////// what is this
      history.push(`/edit/${singlePhoto.id}`)
    }

  }

  const handleDelete = async (e) =>{
    e.preventDefault();
    dispatch(removeSinglePhoto(id))
    history.push(`/profile`)
  }

  if(!singlePhoto){
    return null;
  }

  const redirectToHomepage = () =>{
    history.push(`/${sessionUser.username}/${sessionUser.id}`)
  }

  const redirectToPhotoPage = () =>{
    history.push(`/photos/${singlePhoto.id}`)
  }



  return (
    <div className='edit-form-page'>

        <div className='edit-form-contaner'>
          <button className='edit-redirect-to-homepage' onClick={redirectToHomepage}>Back To Homepage</button>
          <button className='edit-redirect-to-homepage' onClick={redirectToPhotoPage}>Back To Photo Page</button>
            <form className='edit-form' onSubmit={handleSubmit}>

                <div className='edit-label'>
                  <label>
                      Title
                    <div>
                      <input
                      className='edit-input'
                      type="text"
                      value={title}
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
                <div className='edit-label'>
                  <label>
                      Description
                    <div>
                      <input
                      className='edit-input'
                      type="text"
                      value={description}
                      placeholder="Caption"
                      onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
                <div className='edit-label'>
                  <button type="submit">Submit Updates</button>
                </div>
            </form>
          <div>
            <h3>Title: {singlePhoto.title}</h3>
            <h4>Description: {singlePhoto.description}</h4>
          </div>
          <button className='delete-photo-button' onClick={handleDelete}>Delete Photo</button>
        </div>
        <div className='edit-photo-box'>
          <img className='edit-photo'src={singlePhoto.imageUrl}></img>
        </div>


    </div>
  )
}

export default PhotoEditPage;
