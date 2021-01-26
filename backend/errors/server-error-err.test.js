const ServerError = require('./server-error-err');

describe('test 500', () => {
  it('test 500', () => {
    expect.hasAssertions();
    expect(new ServerError().statusCode).toBe(500);
  });
});
