const express = require('express');
const asyncHandler = require('express-async-handler')
const { handleValidationErrors } = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');

const {check} = require('express-validator')

const { Photo, User } = require('../../db/models')

const router = express.Router();


router.get('/', asyncHandler(async(req, res)=>{
  const allPhoto = await Photo.findAll({
    include: [{model: User, attributes: ['username']}]
  });
  return res.json(allPhoto)
}))

router.get('/:id(\\d+)',asyncHandler(async(req, res)=>{
  const photo = await Photo.findByPk(req.params.id,{
    include:[User]
  })
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

//##POST /api/photos
router.post('/', requireAuth,asyncHandler(async(req, res)=>{
  const {imageUrl, title, description, locationId, userId} = req.body
  const photoUpload = await Photo.create({
      userId, imageUrl, title, description, locationId
    });

  return res.json(photoUpload)

}))

const photoNotFoundError = (id) => {
  const err = Error("PHoto not found");
  err.errors = [`Photo with id of ${id} could not be found.`];
  err.title = "Photo not found.";
  err.status = 404;
  return err;
};

router.put('/:id(\\d+)', requireAuth,asyncHandler(async(req,res, next)=>{
  const {title, imageUrl, description, locationId} = req.body
  const photo = await Photo.findOne({
    where: {
      id: req.params.id,
    }
  });

  // if (req.user.id !== photo.userId ){
  //   const err = new Error('unauthorized');
  //   err.status = 401;
  //   err.message = "You are not authrized to edit this photo.";
  //   err.title = "Unauthorised";
  //   throw err;
  // }


  if(photo){
    await photo.update({
    imageUrl, title, description, locationId
    });
    res.json({photo})
  } else {
    next()
  }
}))


router.delete('/:id(\\d+)',requireAuth, asyncHandler(async(req, res)=>{
  const photo = await Photo.findOne({
    where: {
      id: req.params.id,
    }
  });

  if(photo){
    await photo.destroy();
    res.status(204).end()
    // res.json({message: `Deleted photo with id of ${req.params.id}.`})
  }
}))



module.exports = router;

//for old put

// const {title, description, locationId} = req.body
// const photo = await Photo.findOne({
//   where: {
//     id: req.params.id,
//   }
// });


//   await photo.update({////NEEDS TO BE LOWERCASE
//   title, description, locationId
//   });
//   res.json({photo})
