const Joi = require('joi');
const validator = require('validator');

const imageLink = require('../configs/imageLink');
const joiMessages = require('../units/joiMessages');

const { minLength, maxLength } = imageLink;

const { isURL } = validator;

const linkSchema = Joi.string()
  .max(minLength)
  .max(maxLength)
  .custom((value, helpers) => {
    if (!isURL(value)) {
      return helpers.error('url.invalid');
    }
    return value;
  })
  .trim()
  .messages(joiMessages);

module.exports = linkSchema;
