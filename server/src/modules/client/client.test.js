const request = require('supertest');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const app = require('../../app');
const config = require('../../config/config');
const logger = require('../../config/logger');
const { getNewObjectId } = require('../../utils');

let testClient;

const payload = {
  name: 'test',
  email: 'test@test.test',
  phone: '2024561414',
};

const incorrectPayload = {
  name: '',
  email: 'test@test',
  phone: '2024561414ddd',
};

const payload2 = {
  name: 'test-2',
};
const incorrectPayload2 = {
  name: '',
};

beforeAll(async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  logger.info('Connected to MongoDB');
});

describe('Client\'s Endpoints', () => {
  it('should show a client\'s list', async () => {
    const res = await request(app).get('/api/v1/clients');

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create a new client', async () => {
    const res = await request(app).post('/api/v1/clients').send(payload);

    testClient = res.body;

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(testClient.name).toBe(payload.name);
    expect(testClient.email).toBe(payload.email);
    expect(testClient.phone).toBe(payload.phone);
  });

  it('shouldn\'t create a incorrect client', async () => {
    const res = await request(app).post('/api/v1/clients').send(incorrectPayload);

    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(httpStatus.BAD_REQUEST);
  });

  it('should get a client', async () => {
    const res = await request(app).get(`/api/v1/clients/${testClient._id}`);

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.name).toBe(testClient.name);
  });

  it('shouldn\'t get a client', async () => {
    const res = await request(app).get(`/api/v1/clients/${getNewObjectId()}`);

    expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
    expect(res.body.code).toBe(httpStatus.NOT_FOUND);
    expect(res.body.message).toBe('Client is not found');
  });

  it('should update a client', async () => {
    const res = await request(app).put(`/api/v1/clients/${testClient._id}`).send(payload2);

    testClient = res.body;

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(testClient.name).toBe(payload2.name);
    expect(testClient.email).toBe(payload.email);
    expect(testClient.phone).toBe(payload.phone);
  });

  it('shouldn\'t update a client with incorrect payload', async () => {
    const res = await request(app).put(`/api/v1/clients/${testClient._id}`).send(incorrectPayload2);

    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(httpStatus.BAD_REQUEST);
    expect(res.body.message).toBe('name must be at least 1 characters');
  });

  it('shouldn\'t get a client for updating', async () => {
    const res = await request(app).put(`/api/v1/clients/${getNewObjectId()}`).send(payload2);

    expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
    expect(res.body.code).toBe(httpStatus.NOT_FOUND);
    expect(res.body.message).toBe('Client is not found');
  });

  it('should delete a client', async () => {
    const res = await request(app).delete(`/api/v1/clients/${testClient._id}`);

    testClient = null;

    expect(res.statusCode).toEqual(httpStatus.OK);
  });

  it('shouldn\'t delete a client', async () => {
    const res = await request(app).delete(`/api/v1/clients/${getNewObjectId()}`);

    expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
    expect(res.body.code).toBe(httpStatus.NOT_FOUND);
    expect(res.body.message).toBe('Client is not found');
  });
});
