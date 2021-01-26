const ConflictError = require('./conflict-err');

describe('test 409', () => {
  it('test 409', () => {
    expect.hasAssertions();
    expect(new ConflictError().statusCode).toBe(409);
  });
});
