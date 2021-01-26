const jwt = require('jsonwebtoken');

const { JWT_SECRET_DEV } = require('../configs');

const verifyJWTToken = (token) => jwt.verify(token,
  process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : JWT_SECRET_DEV);

module.exports = verifyJWTToken;
