// Only no cors

const request = require('supertest');

const app = require('./app');

describe('Unauthorized', () => {
  it('should response unauthorized get /users/me', () => request(app)
    .get('/users/me')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  it('should response unauthorized post /users/me', () => request(app)
    .post('/users/me')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  it('should response unauthorized post /users/me/avatar', () => request(app)
    .post('/users/me/avatar')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  it('should response unauthorized get /cards', () => request(app)
    .get('/cards')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  it('should response unauthorized post /cards', () => request(app)
    .post('/cards')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  it('should response unauthorized delete /cards/cardId', () => request(app)
    .delete('/cards/600f2467a820d08098b8a48b')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  it('should response unauthorized put /cards/cardId/likes', () => request(app)
    .put('/cards/600f2467a820d08098b8a48b/likes')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  it('should response unauthorized delete /cards/cardId/likes', () => request(app)
    .delete('/cards/600f2467a820d08098b8a48b/likes')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));
});

describe('test should not be 404', () => {
  it('should not be response post /signin', () => request(app)
    .post('/signin')
    .then((response) => {
      expect(response.statusCode).not.toBe(404);
    }));

  it('should not be response post /signup', () => request(app)
    .post('/signup')
    .then((response) => {
      expect(response.statusCode).not.toBe(404);
    }));

  it('should not be response post /logout', () => request(app)
    .post('/logout')
    .then((response) => {
      expect(response.statusCode).not.toBe(404);
    }));
});

describe('test 404', () => {
  it('should response 404', () => request(app)
    .get('/error404')
    .then((response) => {
      expect(response.statusCode).toBe(404);
    }));
});
