const express = require('express');
const asyncHandler = require('express-async-handler')
const {requireAuth} = require('../../utils/auth');

const { Comment , User} = require('../../db/models')

const router = express.Router();

router.get('/photos/:id',asyncHandler(async(req, res)=>{
  const {id} = req.params
  const allComments = await Comment.findAll({
    where: {photoId:id},
    include: User
  })
  return res.json(allComments)
}))

router.post('/photos/:id', requireAuth, asyncHandler(async(req, res)=>{
  const {id} = req.params
  const {comment, userId} = req.body

  const createComment= await Comment.create(
    {
    userId, comment, photoId:id
  },
  )

  const newComment = await Comment.findByPk(createComment.id, {
    include: User
  })

  return res.json(newComment)
}))

router.put('/:id', requireAuth, asyncHandler(async(req, res)=>{
  // const {id} = Number(req.params.id)
  const {comment, id, userId, photoId} = req.body

  const updateComment = await Comment.findByPk(id)

    //if yoou are not the owner of comment, you can't edi tit
    // if (req.user.id !== comment.userId){
    //   const err = new Error('unauthorized');
    //   err.status = 401;
    //   err.message = "You are not authrized to edit this comment.";
    //   err.title = "Unauthorised";
    //   throw err;
    // }

   if(updateComment){
     await updateComment.update({comment, userId, photoId})
     return res.json(updateComment)
   }

}))

router.delete('/:id', requireAuth, asyncHandler(async(req,res)=>{
  const {id} = req.params
  const comment = await Comment.findByPk(id)
  await comment.destroy();
  res.status(204).end()
}))



module.exports = router;


// fetch('/api/comments/photos/1', {
//   method: 'PUT',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN":`l7qZU4tL-u7CJXv_YYAXA4kQjNiJ80hVj3xQ`
//   },
//   body: JSON.stringify({ comment: 'This photo sucks' })
// }).then(res => res.json()).then(data => console.log(data));
