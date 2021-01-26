const Joi = require('joi');

const authToken = Joi.string()
  .min(3)
  .max(500)
  .label('Токен авторизации')
  .error(new Error(''));

module.exports = authToken;
