const request = require('supertest');
const app = require('../app');  // .js は省略OK（CommonJSでは自動補完）

describe('GET /api/notes', () => {
  it('should return 401 if no token provided', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).toBe(401);
  });
});

