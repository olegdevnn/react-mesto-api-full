const { isCelebrateError } = require('celebrate');

const { ERROR_SERVER_ERROR } = require('./httpCodes');
const { ERROR_BAD_REQUEST } = require('./httpCodes');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let {
    statusCode = ERROR_SERVER_ERROR,
    message = '',
  } = err;

  try {
    if (isCelebrateError(err)) {
      const [, joiError] = err.details.entries().next().value;

      statusCode = ERROR_BAD_REQUEST;
      message = joiError.message;
    } else if (err.name === 'CastError') {
      statusCode = ERROR_BAD_REQUEST;
      message = `Переданы некорректные данные, параметр '${err.path}'`;
    } else if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((el) => el.message);

      statusCode = ERROR_BAD_REQUEST;
      message = errors.join(', ');
    } else if (err.type === 'entity.parse.failed') {
      message = 'Не верный формат json';
    }
  } catch (e) {
    console.log(e);
  }

  return res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_SERVER_ERROR || !message
        ? 'На сервере произошла ошибка'
        : message,
    });
};
