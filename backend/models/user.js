const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');

const modelUserConfig = require('../configs/modelUser');
const UnauthorizedError = require('../errors/unauthorized-err');

const {
  email, name, about, avatar,
} = modelUserConfig;

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: email.minLength,
    maxLength: email.maxLength,
    validate: isEmail,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: name.minLength,
    maxLength: name.maxLength,
    default: name.default,
    trim: true,
  },
  about: {
    type: String,
    required: true,
    minLength: about.minLength,
    maxLength: about.maxLength,
    default: about.default,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: isURL,
    minLength: avatar.minLength,
    maxLength: avatar.maxLength,
    default: avatar.default,
    trim: true,
  },
}, {
  timestamps: true,
  collation: {
    locale: 'en_US',
    strength: 2,
  },
});

userSchema.statics.config = modelUserConfig;

userSchema.statics.findUserByCredentials = function findUserByCredentials({
  email: userEmail,
  password: userPassword,
}) {
  return this.findOne({ email: userEmail })
    .select('+password')
    .orFail(() => new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt
      .compare(userPassword, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise
            .reject(new UnauthorizedError('Неправильные почта или пароль'));
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
