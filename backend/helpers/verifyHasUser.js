const NotFoundErrorUser = require('../errors/not-found-err-user');
const User = require('../models/user');

const verifyHasUser = (userId) => User.findById(userId)
  .orFail(() => new NotFoundErrorUser());

module.exports = verifyHasUser;
