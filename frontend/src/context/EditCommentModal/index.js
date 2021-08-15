import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams} from 'react-router-dom';

import { editComment, getComments } from '../../store/comments';

const EditCommentModal = ()=> {
  const dispatch = useDispatch();
  const history = useHistory();
  let {id} = useParams();
  id = Number(id)

  const sessionUser = useSelector(state => state.session.user)
  const comments = useSelector(state => {
    return Object.values(state.comments)
  })

  const filteredComments = comments.filter(comment => comment.photoId === id)

  const comment = useSelector(state => state.comments[id])

  const [showModal, setShowModal] = useState(false);
  const [editedComment, setEditedComment] = useState('')
  const [editedCommentId, setEditedCommentId] = useState('')



  useEffect(() => {
    dispatch(editComment(id))
    dispatch(getComments(id))
}, [dispatch, id, sessionUser.id, editedComment])

if(!comments) return null;

  if (!sessionUser) {
    return (
      <Redirect to='/login' />
    )
  }



  const handleEditSubmit = async (e) =>{
    e.preventDefault();
    const editData = {
      id: editedCommentId,
      comment: editedComment
    }
      // const editData = {
      //   comment: editedComment,
      //   userId: sessionUser.id,
      //   photoId: id,
      //   id: editedCommentId
      // }
        await dispatch(editComment(editData))

        history.push(`/photos/${id}`)

          setShowModal(false)
      }

  const handleCancelEdit = async (e) =>{
    e.preventDefault()
    history.push(`/photos/${id}`)
    await setShowModal(false)
  }

  return (
    <>
    <button className='edit-icon' text='Edit Comment' onClick={() => {setShowModal(true)}} ></button>
    {filteredComments?.map((comment)=>(
      <div hidden={comment.userId !== sessionUser.id}>

          {showModal && (
            <Modal>
              <div className='edit-form-container'>
                        <h3>Edit Comment!</h3>
                        <form className='comment-edit-form' onSubmit={handleEditSubmit}  >
                          <textarea
                          placeholder={comment.comment}
                          type='textarea'
                          value={editedComment.comment}
                          onChange={e => setEditedComment(e.target.value)}
                          style={{width:200}}
                          />
                          <button type='submit' onClick={e=> setEditedCommentId(comment.id)}>submit</button>

                          <button onClick={handleCancelEdit}>Cancel</button>

                        </form>

                  </div>
            </Modal>
          )}
       </div>
    ))}
    </>
  );
}

export default EditCommentModal;
