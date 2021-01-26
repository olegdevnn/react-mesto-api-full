const Joi = require('joi');

const mongoIDSchema = require('./mongoId');

const cardId = Joi.object({
  cardId: mongoIDSchema,
});

module.exports = cardId;
