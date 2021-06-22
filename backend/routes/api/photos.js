const express = require('express');
const asyncHandler = require('express-async-handler')

const { Photo } = require('../../db/models')

const router = express.Router();


router.get('/', asyncHandler(async(req, res)=>{
  const photo = await Photo.findAll();
  return res.json(photo)
}))










module.exports = router;
