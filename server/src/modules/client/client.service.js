const httpStatus = require('http-status');
const Client = require('./client.model');
const ApiError = require('../../utils/api-error');

const create = async (data) => Client.create(data);

const list = async () => Client.find().populate('providers').lean();

const one = async (_id) => {
  const client = await Client.findOne({ _id }).lean();

  if (!client) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Client is not found');
  }

  return client;
};

const update = async (_id, data) => {
  const updatedClient = await Client.updateOne({ _id }, { $set: { ...data } });

  if (updatedClient.matchedCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Client is not found');
  }

  return one(_id);
};

const remove = async (_id) => {
  const deletedClient = await one(_id);

  if (!deletedClient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Client is not found');
  }

  await Client.deleteOne({ _id });

  return deletedClient;
};

module.exports = {
  create, list, one, update, remove,
};
