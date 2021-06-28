import React, {useEffect} from 'react';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Comments.css';
import { getComments } from '../../store/comments'


const Comments = () =>{
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const {id} = useParams()

  useEffect(()=>{
    dispatch(getComments(id))
  }, [dispatch])

  const comments = useSelector(state => {
    return Object.values(state.comments)  //[id]
  })

  console.log('comments?',comments)

  if(!comments) return null;

  if(!sessionUser){
    return(
      <Redirect to='/login' />
    )
  }
  return(
    <div>
      <p>{comments.comment}</p>
    </div>
  )
}

export default Comments;
