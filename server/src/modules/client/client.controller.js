const { wrapAsync } = require('../../utils');
const clientService = require('./client.service');

const create = wrapAsync(async (req, res) => {
  const client = await clientService.create(req.body);

  res.json(client);
});

const list = wrapAsync(async (req, res) => {
  const clients = await clientService.list();

  res.json(clients);
});

const one = wrapAsync(async (req, res) => {
  const client = await clientService.one(req.params.id);

  res.json(client);
});

const update = wrapAsync(async (req, res) => {
  const client = await clientService.update(req.params.id, req.body);

  res.json(client);
});

const remove = wrapAsync(async (req, res) => {
  const client = await clientService.remove(req.params.id);

  res.json(client);
});

module.exports = {
  create, list, one, update, remove,
};
