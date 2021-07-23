const express = require('express')
const asyncHandler = require('express-async-handler');//wrap asynchronous route handlers and custom middlewares.

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];




//this is for USERS-LOGIN
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

//remove the token cookie from the response and return a JSON success message.
// LOGOUT
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

//## GET /api/session   for // restoreUSer
//Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;

//test if login actually works
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN":`nzr1rDdO-0Qx3y9xIxS3PyD8lvWw1kTHXQUc`
//   },
//   body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));



//test if login email works
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `nzr1rDdO-0Qx3y9xIxS3PyD8lvWw1kTHXQUc`
//   },
//   body: JSON.stringify({ credential: '', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));

//test user credentialfield
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({ credential: '', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));
