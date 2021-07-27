import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';

import { getSinglePhoto, removeSinglePhoto, updateSinglePhoto } from '../../store/photos';


// import './EditPhoto.css'


const PhotoEditPage = () =>{
  const dispatch = useDispatch();
  const history = useHistory();

  let {id} = useParams();
  id = Number(id)

  const sessionUser = useSelector(state => state.session.user)

  let singlePhoto = useSelector(state =>{
    return Object.values(state.photos)
  })
  singlePhoto = singlePhoto[0]
  console.log('######', singlePhoto)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getSinglePhoto(id))

  }, [dispatch,id,title,description])

  if (!sessionUser) {
    return (
      <Redirect to='/login' />
    )
  }



  const handleSubmit = async (e) =>{
    e.preventDefault();
    const photoData = {
      id: id,
      title,
      description,
      userId: sessionUser.id
    }
    const editedPhoto = await dispatch(updateSinglePhoto(photoData))


        await setTitle('');
        await setDescription('');

        history.push(`/edit/${id}`)


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

          {/* {singlePhoto.map((photo)=>( */}
            <>
                <div className='edit-form-container'>
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
                              onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </label>
                        </div>
                        <div className='edit-label'>
                          <button type="submit">Submit Updates</button>
                        </div>
                    </form>
                    <div className='photo-description-box'>
                      <h3><span>Title:</span> {singlePhoto.title}</h3>
                      <h3><span>Description:</span> {singlePhoto.description}</h3>
                    </div>
                    <button className='delete-photo-button' onClick={handleDelete}>Delete Photo</button>
            </div>
            <div className='edit-photo-box'>
              <img className='edit-photo'src={singlePhoto.imageUrl}></img>
            </div>
            </>
          {/* ))} */}

    </div>
  )
}

export default PhotoEditPage;
