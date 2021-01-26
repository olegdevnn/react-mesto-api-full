const dotenv = require('dotenv');

dotenv.config();

// Служебная информация
const SALT_ROUNDS = 10;

const JWT_SECRET_DEV = process.env.JWT_SECRET || 'dev-secret';

// Максимальное кол-во карточек на странице
const MAX_CARDS = 30;

// Срок действия кук (7 дней)
const JWT_MAX_AGE = 86400 * 7;

// Список допустимых сайтов, с которых можно обращаться по api
const CORS_WHITELIST = [
  'http://localhost',
  'http://localhost:3001',
  'https://oleg-zvonilov.students.nomoredomains.monster',
];

// Параметры ограничения по кол-ву запросов в определенно время
const API_LIMITER_CONFIG = {
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 1000, // Кол-во соединений за время (windowMs)
};

module.exports = {
  SALT_ROUNDS,
  JWT_SECRET_DEV,
  MAX_CARDS,
  API_LIMITER_CONFIG,
  CORS_WHITELIST,
  JWT_MAX_AGE,
};
