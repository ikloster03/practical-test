const { wrapAsync } = require('../../utils');
const providerService = require('./provider.service');

const create = wrapAsync(async (req, res) => {
  const provider = await providerService.create(req.body);

  res.json(provider);
});

const list = wrapAsync(async (req, res) => {
  const providers = await providerService.list();

  res.json(providers);
});

const one = wrapAsync(async (req, res) => {
  const provider = await providerService.one(req.params.id);

  res.json(provider);
});

const update = wrapAsync(async (req, res) => {
  const provider = await providerService.update(req.params.id, req.body);

  res.json(provider);
});

const remove = wrapAsync(async (req, res) => {
  const provider = await providerService.remove(req.params.id);

  res.json(provider);
});

module.exports = {
  create, list, one, update, remove,
};
