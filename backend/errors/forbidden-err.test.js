const ForbiddenError = require('./forbidden-err');

describe('test 403', () => {
  it('test 403', () => {
    expect.hasAssertions();
    expect(new ForbiddenError().statusCode).toBe(403);
  });
});
