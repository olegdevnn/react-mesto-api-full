const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs');

const verifyJWTToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = verifyJWTToken;
