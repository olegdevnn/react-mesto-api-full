const Joi = require('joi');

const Card = require('../models/card');
const joiMessages = require('../units/joiMessages');
const linkSchema = require('./link');

const { name } = Card.config;

const { object, string } = Joi.types();

const createCardSchema = object.keys({
  name: string
    .label('Название')
    .min(name.minLength)
    .max(name.maxLength),
  link: linkSchema
    .label('Ссылка на изображение'),
})
  .with('name', 'link')
  .required()
  .messages(joiMessages);

module.exports = createCardSchema;
