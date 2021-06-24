import React, {useState} from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import { uploadPhoto } from '../../store/photos';


// userId: 1,
// locationId: null,
// imageUrl: 'https://images.unsplash.com/photo-1513311068348-19c8fbdc0bb6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
// title: 'Title for Photo',
// description: 'This is photo description',

const UpLoadPhoto = () =>{
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state)=> state.session.user);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const photoData = {imageUrl, title, description}
    const createdPhoto = dispatch(uploadPhoto(photoData))
    if(createdPhoto){
      setTitle('');
      setDescription('');
      setImageUrl('');
      history.push(`/photos/${createdPhoto.id}`)////// what is this
    }
  }

return (
  <div className='upload-form-page'>
    <div className='upload-form-contaner'>
      <div className='space-creator'> </div>
        <form className='upload-form' onSubmit={handleSubmit}>
          <label>
              Image URL
              <input
                type="text"
                value={imageUrl}
                placeholder="Image URL"
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
          </label>
          <label>
              Title
              <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              />
          </label>
          <label>
              Description
              <input
              type="text"
              value={description}
              placeholder="Caption"
              onChange={(e) => setDescription(e.target.value)}
              />
          </label>
          <button type="submit">Sign Up</button>
        </form>
    </div>

 </div>
)

}

export default UpLoadPhoto
