const Joi = require('joi');

const linkSchema = require('./link');

const editUserAvatarSchema = Joi.object({
  avatar: linkSchema
    .label('Ссылка на аватар'),
});

module.exports = editUserAvatarSchema;
