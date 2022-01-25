const httpStatus = require('http-status');
const Provider = require('./provider.model');
const Client = require('../client/client.model');
const ApiError = require('../../utils/api-error');

const create = async (data) => Provider.create(data);

const list = async () => Provider.find().lean();

const one = async (_id) => {
  const provider = await Provider.findOne({ _id }).lean();

  if (!provider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Provider is not found');
  }

  return provider;
};

const update = async (_id, data) => {
  const updatedProvider = await Provider.updateOne({ _id }, { $set: { ...data } });

  if (updatedProvider.matchedCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Provider is not found');
  }

  return one(_id);
};

const remove = async (_id) => {
  const deletedProvider = await one(_id);

  if (!deletedProvider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Provider is not found');
  }

  await Client.updateMany({ providers: _id }, { $pull: { providers: _id } });
  await Provider.deleteOne({ _id });

  return deletedProvider;
};

module.exports = {
  create, list, one, update, remove,
};
