const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');//from index.js
const { User } = require('../db/models')

const { secret, expiresIn } = jwtConfig;//from index.js


/*(#1) setting JWT cookie after user loggin in or sign up. expires according to val in .env
payload of JWT = return of instance method .toSafeObject
after created, it is HTTTP-only cookie in resposne as token cookie
*/
// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};


/**(#2)restore User - resores session user based on contents of JWT cookie */
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};



/**(#3) requireAuth:  */
// If there is no current user, return an error
const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  },
];


module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth
};
