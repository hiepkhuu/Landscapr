const express = require('express');
const router = express.Router();
// const csrf = require('csurf');// not sur eif we need this for csrfToken

/** CONNECT ROUTERS TO THIS FILE */
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN');//, req.csrfToken() - commented out as it broke the code
  res.send('Hello World!');
});

module.exports = router;
