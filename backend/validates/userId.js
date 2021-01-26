// TODO (в данной версии не используется)

const Joi = require('joi');

const mongoIDSchema = require('./mongoId');

const userId = Joi.object().keys({
  userId: mongoIDSchema,
});

module.exports = userId;
