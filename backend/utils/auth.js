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
