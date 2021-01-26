const { NotFoundCard } = require('./messages-err');
const NotFoundError = require('./not-found-err');

class NotFoundErrorCard extends NotFoundError {
  constructor(message) {
    super(message);
    this.message = NotFoundCard;
  }
}

module.exports = NotFoundErrorCard;
