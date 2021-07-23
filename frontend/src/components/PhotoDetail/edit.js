// import React, {useEffect, useState} from 'react';
// import { useHistory, Redirect, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import './Comments.css';
// import { getComments, editComment, loadSingleComment} from '../../store/comments'
// import CommentEditModal from '../../context/CommentEditModal';// for MODAL


// const EditSingleComment = () =>{
//   const dispatch = useDispatch();
//   const {id} = useParams()
//   const sessionUser = useSelector(state => state.session.user);
//   const singleComment = useSelector(state => state.comments[id])


//   const [editedComment, setEditedComment] = useState('')//delete
//   const [editedCommentId, setEditedCommentId] = useState('')//delete


//   const [comment, setComment]= useState(singleComment.comment)
//   // const [commentToDeleteId, setCommentToDeleteId] = useState('')

//   console.log('#####3', singleComment)

//   // const comments = useSelector(state => {
//   //   return Object.values(state.comments)  //[id]
//   // })

//   // const comments = useSelector(state =>{
//   //   return Object.values( state.comments)
//   // })

//   // const filteredComments = comments.filter(eachComment => eachComment.userId === sessionUser.id)
//   // const filteredComments = comments.filter(eachComment => eachComment.photoId === Number(id))


//   useEffect(()=>{
//     dispatch(getComments(id))
//   }, [dispatch, id])



//   if(!singleComment) return null;

//   if(!sessionUser){
//     return(
//       <Redirect to='/login' />
//     )
//   }


//   const handleEditSubmit = async (e)=>{
//     e.preventDefault();
//     const editData = {
//       comment: editedComment,
//       userId: sessionUser.id,
//       photoId: id,
//       id: editedCommentId
//     }
//       const newComment = await dispatch(editComment(editData))
//       if (newComment){
//         setEditedComment('')
//       }
//     }

//   // const handleDelete = async (e)=>{
//   //   e.preventDefault()
//   //   dispatch(deleteComment(commentToDeleteId))

//   // }

//   return(
//     <div>
//       {/* <div clsssName='comment-container'>
//         {filteredComments.map((comment)=>(
//           <div className='comment-box'>
//           <div className='comment-box-username'>
//             <h3>{comment.User?.username}</h3>
//           </div>
//           <div className='comment-content'>
//             <p>{comment.comment}</p>
//             {if (comment.userId !== sessionUser.id) false = true}
//             <form onSubmit={handleDelete} hidden={comment.userId !== sessionUser.id}>
//               <button type='submit' onClick={e=> setCommentToDeleteId(comment.id)}>Delete</button>
//               <CommentEditModal />
//             </form>
//           </div>
//           </div>
//         ))}

//       </div> */}
//       <div>
//             <form className='comment-edit-form' onSubmit={handleEditSubmit}>
//                     <textarea
//                     placeholder='new comment'
//                     type='textarea'
//                     value={editedComment}
//                     onChange={e => setEditedComment(e.target.value)}
//                     style={{width:200}}
//                     ></textarea>
//                     <button type='submit' onClick={e=> setEditedCommentId(comment.id)}>Edit Comment</button>
//             </form>

//       </div>
//     </div>
//   )
// }

// export default EditSingleComment;
