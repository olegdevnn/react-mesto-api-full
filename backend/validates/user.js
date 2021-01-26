const Joi = require('joi');

const User = require('../models/user');
const joiMessages = require('../units/joiMessages');
const linkSchema = require('./link');

const {
  email, password, name, about,
} = User.config;
const { string } = Joi.types();

const emailSchema = string
  .label('Почта')
  .email({ minDomainSegments: 2 })
  .min(email.minLength)
  .max(email.maxLength)
  .messages(joiMessages)
  .trim();

const passwordSchema = string
  .label('Пароль')
  .min(password.minLength)
  .max(password.maxLength)
  .messages(joiMessages)
  .trim();

const nameSchema = string
  .label('Имя')
  .min(name.minLength)
  .max(name.maxLength)
  .messages(joiMessages)
  .trim();

const aboutSchema = string
  .label('Профессия')
  .min(about.minLength)
  .max(about.maxLength)
  .messages(joiMessages)
  .trim();

const avatarSchema = linkSchema
  .label('Ссылка на аватар')
  .messages(joiMessages)
  .trim();

module.exports = {
  emailSchema,
  passwordSchema,
  nameSchema,
  aboutSchema,
  avatarSchema,
};
