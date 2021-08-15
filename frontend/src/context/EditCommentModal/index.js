import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect} from 'react-router-dom';

import { editComment } from '../../store/comments';

const EditPhotoModal = (comment,id)=> {
  const dispatch = useDispatch();
  // console.log('#####3', comment)
  // let {id} = useParams();
  // id = Number(id)

  const sessionUser = useSelector(state => state.session.user)



  const [showModal, setShowModal] = useState(false);
  const [editedComment, setEditedComment] = useState('')
  const [editedCommentId, setEditedCommentId] = useState('')

  // useEffect(() => {
  //   dispatch(getComments(id))

  // }, [dispatch, id])

  if (!sessionUser) {
    return (
      <Redirect to='/login' />
    )
  }



  const handleEditSubmit = async (e) =>{
    e.preventDefault();
      const editData = {
        comment: editedComment,
        userId: sessionUser.id,
        photoId: id,
        id: editedCommentId
      }
        const newComment = await dispatch(editComment(editData))

          await setEditedComment('')
          console.log(newComment)
          // history.push(`/photos/${Number(id)}}`)
          setShowModal(false)
      }

  const handleCancelEdit = async (e) =>{
    e.preventDefault()
    await setShowModal(false)
  }

  return (
    <>
      <button className='edit-icon' onClick={() => setShowModal(true)} ></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
           <div className='edit-form-container'>
                    <form className='comment-edit-form' onSubmit={handleEditSubmit}  hidden={comment.userId !== sessionUser.id}>
                      <textarea
                      placeholder=''
                      type='textarea'
                      value={editedComment}
                      onChange={e => setEditedComment(e.target.value)}
                      style={{width:200}}
                      ></textarea>
                      <button type='submit' onClick={e=> setEditedCommentId(comment.id)}>submit</button>

                      <button onClick={handleCancelEdit}>Cancel</button>

                    </form>

              </div>
        </Modal>
      )}
    </>
  );
}

export default EditPhotoModal;
