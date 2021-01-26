const NotFoundError = require('./not-found-err');

describe('test 404', () => {
  it('test 404', () => {
    expect.hasAssertions();
    expect(new NotFoundError().statusCode).toBe(404);
  });
});
