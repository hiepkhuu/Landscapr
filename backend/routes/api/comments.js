const express = require('express');
const asyncHandler = require('express-async-handler')
const {requireAuth} = require('../../utils/auth');

const { Comment } = require('../../db/models')

const router = express.Router();

router.get('/photos/:id(\\d+)',asyncHandler(async(req, res)=>{
  const {id} = parseInt(req.params, 10)
  const allComments = await Comment.findAll({
    where: {photoId: id},
    include: User
  })
  return res.json(comments)
}))

router.post('/photos/:id(\\d+)',requireAuth,  asyncHandler(async(req, res)=>{
  const {id} = parseInt(req.params, 10)
  const {comment, userId} = req.body

  const createComment= await Comment.create({
    userId, comment, photoId:id
  })

  const newComment = await Comment.findByPk(createComment.id, {
    include: userId
  })

  return req.json(newComment)
}))

router.put('/photos/:id(\\d+)', requireAuth, asyncHandler(async(req, res)=>{
  const {id} = parseInt(req.params, 10)

  const updateComment = await Comment.findOne({
    where: {
      photoId:id
    } })

   if(updateComment){
     await updateComment.update({comment})
     return res.json(updateComment)
   }

}))

router.delete('/:id', requireAuth, asyncHandler(async(req,res)=>{
  const {id} = parseInt(req.params,10);
  const comment = await Comment.findByPk({
    where: {photoId: id}
  })

  await comment.destroy();
  res.status(204).end()
}))



module.exports = router;
