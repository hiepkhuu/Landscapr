const express = require('express');
const asyncHandler = require('express-async-handler')
const { handleValidationErrors } = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');

const {check} = require('express-validator')

const { Photo, User } = require('../../db/models')

const router = express.Router();


router.get('/', asyncHandler(async(req, res)=>{
  const allPhoto = await Photo.findAll();
  return res.json(allPhoto)
}))

router.get('/:id', asyncHandler(async(req, res)=>{
  const photo = await Photo.findByPk(req.params.id)
  return res.json(photo)
}))

const photoValidation = [
  check('imageUrl')
    .exists({checkFalsy: true })
    .withMessage('Please include a photo'),
  check('title')
    .exists({checkFalsy: true })
    .withMessage('Please give your photo a title'),
  check('description')
    .exists({checkFalsy: true })
    .withMessage('Please give your photo a description'),
    handleValidationErrors,
]

//##POST /api/users
router.post('/', asyncHandler(async(req, res)=>{
  const {imageUrl, title, description, locationId, userId} = req.body
  const photoUpload = await Photo.create({
      userId, imageUrl, title, description, locationId
    });

  return res.json(photoUpload)


}))








module.exports = router;
