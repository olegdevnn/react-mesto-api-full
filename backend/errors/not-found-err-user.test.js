const { NotFoundUser } = require('./messages-err');
const NotFoundErrorUser = require('./not-found-err-user');

describe('test 404', () => {
  it('test 404', () => {
    expect.assertions(2);
    expect(new NotFoundErrorUser().statusCode).toBe(404);
    expect(new NotFoundErrorUser().message).toBe(NotFoundUser);
  });
});
