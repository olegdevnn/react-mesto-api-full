const { NotFoundCard } = require('./messages-err');
const NotFoundErrorCard = require('./not-found-err-card');

describe('test 404', () => {
  it('test 404', () => {
    expect.assertions(2);
    expect(new NotFoundErrorCard().statusCode).toBe(404);
    expect(new NotFoundErrorCard().message).toBe(NotFoundCard);
  });
});
