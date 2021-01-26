const Joi = require('joi');

const User = require('../models/user');
const joiMessages = require('../units/joiMessages');

const { name, about } = User.config;

const { object, string } = Joi.types();

const editUserSchema = object.keys({
  name: string
    .label('Имя')
    .min(name.minLength)
    .max(name.maxLength),
  about: string
    .label('Профессия')
    .min(about.minLength)
    .max(about.maxLength),
}).required()
  .with('name', 'about')
  .messages(joiMessages);

module.exports = editUserSchema;
