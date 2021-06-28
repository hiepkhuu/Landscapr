const express = require('express');
const asyncHandler = require('express-async-handler')

const { Comment } = require('../../db/models')

const router = express.Router();

router.get('/photos/:id(\\d+)', asyncHandler(async(req, res)=>{
  const {id} = parseInt(req.params, 10)
  const allComments = await Comment.findAll({
    where: {photoId: id},
    include: User
  })
  return res.json(comments)
}))

router.post('/photos/:id(\\d+)', asyncHandler(async(req, res)=>{
  const {id} = parseInt(req.params, 10)
  const {comment, userId} = req.body

  const newComment= await Comment.create({
    userId, comment, photoId:id
  })

  const comment = await Comment.findByPk(newComment.id, {
    include: userId
  })

  return req.json(commentUpload)
}))

router.put('/photos/:id(\\d+)', asyncHandler(async(req, res)=>{
  const {id} = parseInt(req.params, 10)
  const {comment, userId} = req.body

  const comment = await Comment.findOne({
    where: {
      photoId:id
    }
  })
}))



module.exports = router;
