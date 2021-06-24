import React from 'react';
import { useSelector } from 'react-redux';
import { getSinglePhoto } from '../../store/photos';
import './PhotoEditPage.css'


const PhotoEditPage = () =>{
  const dispatch = useDispatch();
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

  return (
    <div className='photo-edit-page'>
      <p> edit page here</p>
    </div>
  )
}

export default PhotoEditPage;
