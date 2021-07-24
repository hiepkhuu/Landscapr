import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePhoto, uploadPhoto } from '../../store/photos';
import './UpLoadPhoto.css'


const UpLoadPhoto = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  if (!sessionUser) return <Redirect to="/login" />;

  let editedPhoto;
  let banana;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const photoData = {
      imageUrl,
      title,
      description,
      userId: sessionUser.id
    }

    const createdPhoto = await dispatch(uploadPhoto(photoData))
    if (createdPhoto) {
      setTitle('');
      setDescription('');
      setImageUrl('');
      // history.push(`/photos/${createdPhoto.id}`)////// what is this
      history.push(`/edit/${createdPhoto.id}`)
    }
  }



  return (
    <div className='upload-form-page'>
      <div className='behind-nav'></div>
      <div className='upload-form-contaner'>

        <form className='upload-form' onSubmit={handleSubmit}>
          <div className='upload-label'>
            <label>
              Image URL
              <div>
                <input
                  className='upload-input'
                  type="text"
                  value={imageUrl}
                  placeholder="Past image address URL here."
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
            </label>
          </div>
          <div className='upload-label'>
            <label>
              Title
              <div>
                <input
                  className='upload-input'
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className='upload-label'>
            <label>
              Description
              <div>
                <input
                  className='upload-input'
                  type="text"
                  value={description}
                  placeholder="Caption"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className='upload-label'>
            <button type="submit">Upload Photo</button>
          </div>
        </form>
        <div>



        </div>
      </div>
      {banana}
    </div>
  )
}


export default UpLoadPhoto
