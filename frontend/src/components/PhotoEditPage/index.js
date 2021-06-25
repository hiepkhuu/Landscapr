import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { getSinglePhoto } from '../../store/photos';
import './PhotoEditPage.css'


const PhotoEditPage = () =>{
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState('');
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

  if(!singlePhoto){
    return null;
  }

  return (
    <div className='edit-form-page'>
        <div className='edit-form-contaner'>

            <form className='edit-form' onSubmit=''>
                <div className='edit-label'>
                  <label>
                      Image URL
                    <div>
                      <input
                        className='edit-input'
                        type="text"
                        value={imageUrl}
                        placeholder="Past image address URL here."
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                      />
                    </div>
                  </label>
                </div>
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
                  <button type="submit">edit Photo</button>
                </div>
            </form>
        </div>
        <div className='edit-photo-box'>
          <img className='edit-photo'src={singlePhoto.imageUrl}></img>
        </div>

    </div>
  )
}

export default PhotoEditPage;
