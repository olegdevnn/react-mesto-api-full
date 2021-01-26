const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs');

const getJWTToken = (data, options = {}) => jwt.sign(
  data,
  JWT_SECRET,
  options,
);

module.exports = getJWTToken;
