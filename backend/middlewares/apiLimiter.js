const rateLimit = require('express-rate-limit');

const { API_LIMITER_CONFIG } = require('../configs/index');

const limitReached = (req, res) => res
  .status(429).send({ message: 'Много соединений.' });

const addOptions = {
  // При первом достижения ограничения лимита
  onLimitReached: limitReached,

  // После превышения максимального лимита
  handler: limitReached,
};

const apiLimiter = rateLimit(Object.assign(API_LIMITER_CONFIG, addOptions));

module.exports = apiLimiter;
