const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumsRouter = require('./albums.js');
const commentsRouter = require('./comments.js');
const photosRouter = require('./photos.js');

/**USING ROUTERS HERE */
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/photos', photosRouter);
router.use('/albums', albumsRouter);
router.use('/comments', commentsRouter);


//to test your routes
// router.get ('/photos', function(req, res){
//   res.send('this works')
// })





module.exports = router;


//test fetch request to the browser
// fetch('api/test', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'XSRF-TOKEN': ``
//   },
//   body: JSON.stringify({hello: 'world'})
// }).then(res => res.json()).then(data => console.log(data))




// TEST FOR COOKIE SUCCEESS!!GET /api/set-token-cookie
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

//TEST FOR RESOTRE USER MIDDLEWARE
// GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//TEST FOR REQUIRE AUTH
// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
