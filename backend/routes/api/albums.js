const express = require('express');
const asyncHandler = require('express-async-handler')
const { handleValidationErrors } = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');

const { Album } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async(req,res)=>{
  const allAlbums = await Album.findAll()

  return res.json(allAlbums)
}))




module.exports = router;
