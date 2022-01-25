const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../src/app');

describe('Provider\'s Endpoints', () => {
  it('should health check is OK', async () => {
    const res = await request(app).get('/health-check');

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.res.text).toBe('OK');
  });
});
