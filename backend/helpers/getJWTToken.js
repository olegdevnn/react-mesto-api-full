const jwt = require('jsonwebtoken');

const { JWT_SECRET_DEV } = require('../configs');

const getJWTToken = (data, options = {}) => jwt.sign(
  data,
  process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : JWT_SECRET_DEV,
  options,
);

module.exports = getJWTToken;
