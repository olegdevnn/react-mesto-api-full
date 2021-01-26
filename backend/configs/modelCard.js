const imageLink = require('./imageLink');

const { minLength, maxLength } = imageLink;

// Параметры для модели карточек
const modelCard = {
  name: {
    minLength: 2,
    maxLength: 30,
  },
  link: {
    minLength,
    maxLength,
  },
};

module.exports = modelCard;
