const BadRequestError = require('./bad-request-err');

describe('test 400', () => {
  it('test 400', () => {
    expect.assertions(2);
    expect(new BadRequestError().statusCode).toBe(400);
    expect(new BadRequestError().message).toBe('Неверный запрос');
  });
});
