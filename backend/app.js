const bodyParser = require('body-parser');
const { celebrate, Joi, Segments } = require('celebrate');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const typeis = require('type-is');

const { createUser, login } = require('./controllers/users');
const { logout } = require('./controllers/users');
const BadRequestError = require('./errors/bad-request-err');
const NotFoundError = require('./errors/not-found-err');
const apiLimiter = require('./middlewares/apiLimiter');
const auth = require('./middlewares/auth');
const corsValidate = require('./middlewares/corsValidate');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const handleErrors = require('./units/handleErrors');
const authToken = require('./validates/authToken');
const createUserSchema = require('./validates/createUser');
const loginSchema = require('./validates/login');

const app = express();

dotenv.config();

const {
  NODE_ENV = 'production',
  DB_NAME = 'mestodb',
  DB_USER = '',
  DB_PASS = '',
  DB_HOST = 'mongodb://localhost:27017',
} = process.env;

app.use(corsValidate);

app.use((req, res, next) => {
  // fix typeis
  if (!typeis.hasBody(req) || Number(req.headers['content-length']) === 0) {
    return next();
  }

  if (!typeis(req, ['application/json'])) {
    return next(new BadRequestError('Тело запроса должен быть типом \'application/json\''));
  }

  return next();
});

app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json({ type: 'application/json' }));

app.use(csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
  value: (req) => (req.cookies.csrfToken),
}));

app.get('/getToken', (req, res) => {
  res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  }).status(204).send();
});

app.use(apiLimiter);

app.use(helmet());

// Предварительная проверка cookie jwt, csrf на валидность
app.use(celebrate({
  [Segments.COOKIES]: Joi.object({
    jwt: authToken, // токен авторизации
    csrfToken: authToken, // csrf
    _csrf: authToken, // по умолчанию csurf
  }),
}));

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: NODE_ENV === 'development',
  dbName: DB_NAME,
  user: DB_USER,
  pass: DB_PASS,
  authSource: (DB_USER),
}, (err) => {
  if (err) console.log(err);
});

if (NODE_ENV === 'development') {
  mongoose.set('debug', { shell: true });
}

app.use(requestLogger);

// TODO: Удалить после прохождения код-ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  [Segments.BODY]: loginSchema,
}), login);

app.post('/signup', celebrate({
  [Segments.BODY]: createUserSchema,
}), createUser);

app.post('/logout', logout);

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);

// 404 роутеры не логируюся
app.use((req, res) => res.status(404).send(new NotFoundError('Запрашиваемый ресурс не найден')));

app.use(errorLogger);

app.use(handleErrors);

module.exports = app;
