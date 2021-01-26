const UnauthorizedError = require('./unauthorized-err');

describe('test 401', () => {
  it('test 401', () => {
    expect.hasAssertions();
    expect(new UnauthorizedError().statusCode).toBe(401);
  });
});
