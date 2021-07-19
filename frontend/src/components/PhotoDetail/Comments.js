import React, {useEffect, useState} from 'react';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Comments.css';
import { getComments, uploadComment, deleteComment } from '../../store/comments'


const Comments = () =>{
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  const [comment, setComment]= useState('')
  const [commentToDeleteId, setCommentToDeleteId] = useState('')

  const {id} = useParams()

  // const comments = useSelector(state => {
  //   return Object.values(state.comments)  //[id]
  // })

  const comments = useSelector(state =>{
    return Object.values( state.comments)
  })

  // const filteredComments = comments.filter(eachComment => eachComment.userId === sessionUser.id)
  const filteredComments = comments.filter(eachComment => eachComment.photoId === Number(id))


  useEffect(()=>{
    dispatch(getComments(id))
  }, [dispatch, id])


  console.log('comments?',comments)

  if(!comments) return null;

  if(!sessionUser){
    return(
      <Redirect to='/login' />
    )
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const commentData = {
      comment: comment,
      userId: sessionUser.id,
      photoId: id
    }
      const newComment = dispatch(uploadComment(commentData))
      if (newComment){
        setComment('')
      }
    }

  const handleDelete = async (e)=>{
    e.preventDefault()
    dispatch(deleteComment(commentToDeleteId))

  }

  return(
    <div>
      <div clssName='comment-container'>
        {filteredComments.map((comment)=>(
          <div className='comment-box'>
          <div>
            <h3>{comment.User?.username}</h3>
          </div>
          <div className='comment-content'>
            <p>{comment.comment}</p>
            <form onSubmit={handleDelete}>
              <button type='submit' onClick={e=> setCommentToDeleteId(comment.id)}>Delete</button>
            </form>
          </div>
          </div>
        ))}

      </div>
      <div>
        <form className='comment-form' onSubmit={handleSubmit}>
            <textarea placeholder='Add a comment'
            type='textarea'
            value={comment}
            onChange={e => setComment(e.target.value)}
            style={{width:200}}
            ></textarea>
            <button onClick={handleSubmit}>Comment</button>
        </form>

      </div>
    </div>
  )
}

export default Comments;
