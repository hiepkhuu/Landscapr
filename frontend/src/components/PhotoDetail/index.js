import React, { useEffect } from 'react';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePhoto } from '../../store/photos';
import { getComments} from '../../store/comments'
import Comments from './Comments.js'
import EditPhotoModal from '../../context/EditPhotoModal';// for MODAL

import './PhotoDetail.css'
import './Comments.css'
import allRightsReserved from './images/all-rights-reserved.png'


const PhotoDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  id = Number(id)

  const sessionUser = useSelector(state => state.session.user)
  const singlePhoto = useSelector(state => state.photos[id]);

  const comments = useSelector(state =>{
    return Object.values( state.comments)
  })

  const filteredComments = comments.filter(eachComment => eachComment.photoId === id)
  const numberOfComments = filteredComments.length
  useEffect(() => {
    dispatch(getSinglePhoto(id))
    dispatch(getComments(id))
  }, [dispatch])

  if (!sessionUser) {
    return (
      <Redirect to='/login' />
    )
  }


  if (!singlePhoto) {
    return null;
  }

  const directToEditPage = () => {
    history.push(`/edit/${singlePhoto.id}`)
  }



  let showEditButton;
  if (singlePhoto.userId === sessionUser.id) {
    showEditButton = (
      <div className='edit-photo-button' >
        < EditPhotoModal />
      </div>
    )
  }

  let monthConvert = {
    '01': "January",
    '02': "February",
    '03': "March",
    '04': "April",
    '05': "may",
    '06': "June",
    '07': "July",
    '08': "August",
    '09': "September",
    '10': "October",
    '11': "November",
    '12': "December",
  }

  const convertDateToReadable = (input) =>{
    let year = input.slice(0,4);
    let month = input.slice(5,7);
    let day = input.slice(8,10)
    return monthConvert[month] + " " + day + ", " + year
  }


  return (
    <div className='singlephoto-detail-page'>
      <div className='singlephoto-container'>
        <div className='explore-link'>
          <Link className='explore-link link' to='/explore'>Back to Explore</Link>
          {/* <Link to={`/photos/${singlePhoto.id - 1}`}> previous </Link> */}
        </div>
        <div className='single-photo'>
          <img src={singlePhoto.imageUrl}></img>

        </div>
        {showEditButton}
        {/* <div className='btn-edit'>
            <Link
            className='btn-edit link'
            to={`/edit/${singlePhoto.id}`}
            hidden={singlePhoto.userId !== sessionUser.id}
            >Edit Photo</Link>
        </div> */}
      </div>

      <div className='photo-detail-container'>
        <div className='photo-details'>
          <div className='details-header'>
            <div>
                <div>
                  <Link className='user-link-header' to={`/${singlePhoto.User?.username}/${singlePhoto.userId}`}>{singlePhoto.User?.username}</Link>
                </div>
                <div>
                  <h4 className='photo-title'>{singlePhoto.title}</h4>
                </div>
                <div>
                  <p className='photo-description'>{singlePhoto.description}</p>
                </div>

            </div>
                {/* <div className='photo-stats-column-2'>
                    <div className='photo-stats'>
                      <span>0</span>
                      <p>faves</p>

                    </div>
                    <div className='photo-stats-comments'>
                      <span>{numberOfComments}</span>
                      <p>comments</p>

                    </div>

                    <div>
                      <span>Taken on <span>{convertDateToReadable(singlePhoto.createdAt)}</span></span>
                      <div className='allrights-2'>
                        <img  src={allRightsReserved}></img>
                        <p className="trade-mark">  All Rights Reserved</p>
                      </div>

                    </div>

                </div> */}


          </div>

          <div className='comment-container'>
            <Comments />
          </div>
        </div>
        <div className='photo-stats-column'>
          <div className='photo-stats'>
            <span>0</span>
            <p>faves</p>

          </div>
          <div className='photo-stats-comments'>
            <span>{numberOfComments}</span>
            <p>comments</p>

          </div>

          <div>
            <span>Taken on <span>{convertDateToReadable(singlePhoto.createdAt)}</span></span>
            <div className='allrights'>
              <img  src={allRightsReserved}></img>
              <p className="trade-mark">  All Rights Reserved</p>
            </div>

          </div>

        </div>
      </div>


    </div>

  )
}

export default PhotoDetail;
