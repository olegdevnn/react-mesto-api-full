const { celebrate, Segments } = require('celebrate');
const express = require('express');

const { editAvatarUser, editUser, getUser } = require('../controllers/users');
const editUserSchema = require('../validates/editUser');
const editUserAvatarSchema = require('../validates/editUserAvatar');

const router = express.Router();

router.get('/me', getUser);

router.patch('/me', celebrate({
  [Segments.BODY]: editUserSchema,
}), editUser);

router.patch('/me/avatar', celebrate({
  [Segments.BODY]: editUserAvatarSchema,
}), editAvatarUser);

module.exports = router;
