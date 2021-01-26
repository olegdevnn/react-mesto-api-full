const Joi = require('joi');
const mongoose = require('mongoose');

const joiMessages = require('../units/joiMessages');

const mongoId = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('string.invalid');
    }

    return value;
  })
  .messages(joiMessages);

module.exports = mongoId;
