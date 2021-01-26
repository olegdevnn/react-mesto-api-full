const Joi = require('joi');

const verifyPassword = require('../helpers/verifyPassword');
const {
  passwordSchema, emailSchema, nameSchema, aboutSchema, avatarSchema,
} = require('./user');

const createUserSchema = Joi.object({
  email: emailSchema
    .required(),
  password: passwordSchema
    .required()
    .custom(verifyPassword),
  name: nameSchema,
  about: aboutSchema,
  avatar: avatarSchema,
}).with('email', 'password');

module.exports = createUserSchema;
