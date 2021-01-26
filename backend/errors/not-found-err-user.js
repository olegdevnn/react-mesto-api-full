const { NotFoundUser } = require('./messages-err');
const NotFoundError = require('./not-found-err');

class NotFoundErrorUser extends NotFoundError {
  constructor(message) {
    super(message);
    this.message = NotFoundUser;
  }
}

module.exports = NotFoundErrorUser;
