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
  // const {id} = Number(req.params.id)
  const {comment, userId} = req.body

  const updateComment = await Comment.findOne({
    where: {
      photoId: req.params.id
    } })

    //if yoou are not the owner of comment, you can't edi tit
    // if (req.user.id !== comment.userId){
    //   const err = new Error('unauthorized');
    //   err.status = 401;
    //   err.message = "You are not authrized to edit this comment.";
    //   err.title = "Unauthorised";
    //   throw err;
    // }

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
