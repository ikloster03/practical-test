const request = require('supertest');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const app = require('../../app');
const config = require('../../config/config');
const logger = require('../../config/logger');
const { getNewObjectId } = require('../../utils');

let testProvider;

const payload = {
  name: 'test',
};

const incorrectPayload = {
  name: '',
};

const payload2 = {
  name: 'test-2',
};

let testClient;

beforeAll(async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  logger.info('Connected to MongoDB');
});

describe('Provider\'s Endpoints', () => {
  it('should show a provider\'s list', async () => {
    const res = await request(app).get('/api/v1/providers');

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create a new provider', async () => {
    const newProvider = await request(app).post('/api/v1/providers').send(payload);

    const { body: clients } = await request(app).get('/api/v1/clients');

    const [client] = clients;

    testProvider = newProvider.body;

    const updatedClient = await request(app).put(`/api/v1/clients/${client._id}`).send({
      providers: [...client.providers, testProvider._id],
    });

    testClient = updatedClient.body;

    expect(newProvider.statusCode).toEqual(httpStatus.OK);
    expect(testProvider.name).toBe(payload.name);
  });

  it('shouldn\'t create a incorrect provider', async () => {
    const res = await request(app).post('/api/v1/providers').send(incorrectPayload);

    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(httpStatus.BAD_REQUEST);
    expect(res.body.message).toBe('name must be at least 1 characters');
  });

  it('should get a provider', async () => {
    const res = await request(app).get(`/api/v1/providers/${testProvider._id}`);

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.name).toBe(testProvider.name);
  });

  it('shouldn\'t get a provider', async () => {
    const res = await request(app).get(`/api/v1/providers/${getNewObjectId()}`);

    expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
    expect(res.body.code).toBe(httpStatus.NOT_FOUND);
    expect(res.body.message).toBe('Provider is not found');
  });

  it('should update a provider', async () => {
    const res = await request(app).put(`/api/v1/providers/${testProvider._id}`).send(payload2);

    testProvider = res.body;

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(testProvider.name).toBe(payload2.name);
  });

  it('shouldn\'t update a provider with incorrect payload', async () => {
    const res = await request(app).put(`/api/v1/providers/${testProvider._id}`).send(incorrectPayload);

    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(httpStatus.BAD_REQUEST);
    expect(res.body.message).toBe('name must be at least 1 characters');
  });

  it('shouldn\'t get a provider for updating', async () => {
    const res = await request(app).put(`/api/v1/providers/${getNewObjectId()}`).send(payload2);

    expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
    expect(res.body.code).toBe(httpStatus.NOT_FOUND);
    expect(res.body.message).toBe('Provider is not found');
  });
  //
  // it('should delete a provider', async () => {
  //   const res = await request(app).delete(`/api/v1/providers/${testProvider._id}`);
  //
  //   testProvider = null;
  //
  //   expect(res.statusCode).toEqual(httpStatus.OK);
  // });

  it('should delete all mentions of client\'s providers before deleting provider', async () => {
    const res = await request(app).delete(`/api/v1/providers/${testProvider._id}`);

    const res2 = await request(app).get(`/api/v1/clients/${testClient._id}`);

    testProvider = null;

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res2.body.providers.length).toBe(testClient.providers.length - 1);
  });

  it('shouldn\'t delete a provider', async () => {
    const res = await request(app).delete(`/api/v1/providers/${getNewObjectId()}`);

    expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
    expect(res.body.code).toBe(httpStatus.NOT_FOUND);
    expect(res.body.message).toBe('Provider is not found');
  });
});
