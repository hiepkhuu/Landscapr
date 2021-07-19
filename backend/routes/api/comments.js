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

router.put('/photos/:id', requireAuth, asyncHandler(async(req, res)=>{
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
  const {id} = req.params
  const comment = await Comment.findByPk(id)

  await comment.destroy();
  res.status(204).end()
}))



module.exports = router;
