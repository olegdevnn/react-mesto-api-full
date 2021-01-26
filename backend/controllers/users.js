const bcrypt = require('bcrypt');

const { SALT_ROUNDS, JWT_MAX_AGE } = require('../configs');
const ConflictError = require('../errors/conflict-err');
const NotFoundErrorUser = require('../errors/not-found-err-user');
const getJWTToken = require('../helpers/getJWTToken');
const User = require('../models/user');
const { CREATED_SUCCESS } = require('../units/httpCodes');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials({ email, password });

    const token = getJWTToken(
      { _id: user._id },
      { expiresIn: JWT_MAX_AGE },
    );

    return res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: JWT_MAX_AGE * 1000,
        secure: process.env.NODE_ENV === 'production',
      })
      .send({ message: 'Авторизация успешна' });
  } catch (err) {
    return next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    return res
      .clearCookie('jwt')
      .send({ message: 'Вы успешно вышли из системы' });
  } catch (err) {
    return next(err);
  }
};

const createUser = (req, res, next) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;

    return User.findOne({ email })
      .then((user) => {
        if (user) {
          return next(new ConflictError('Такой пользователь уже существует'));
        }

        return bcrypt.hash(password, SALT_ROUNDS)
          .then((hash) => User.create({
            email,
            password: hash,
            name,
            about,
            avatar,
          })
            .then(({ _id }) => User.findById(_id)));
      })
      .then((user) => res.status(CREATED_SUCCESS).send(user))
      .catch((err) => next(err));
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id)
      .orFail(() => new NotFoundErrorUser());

    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, about } = req.body;

    return User.findByIdAndUpdate(
      _id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(() => new NotFoundErrorUser())
      .then((user) => res.send(user))
      .catch((err) => next(err));
  } catch (err) {
    return next(err);
  }
};

const editAvatarUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(() => new NotFoundErrorUser())
      .exec();

    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login, logout, createUser, getUser, editUser, editAvatarUser,
};
