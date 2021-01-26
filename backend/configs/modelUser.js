const imageLink = require('./imageLink');

const { minLength, maxLength } = imageLink;

// Параметры для модели пользователя
const modelUser = {
  email: {
    minLength: 2,
    maxLength: 30,
  },
  password: {
    minLength: 8,
    maxLength: 30,
  },
  name: {
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    minLength,
    maxLength,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
};

module.exports = modelUser;
