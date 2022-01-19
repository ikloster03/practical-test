const express = require('express');
const providerController = require('./provider.controller');

const router = express.Router();

router.get('/', providerController.list);
router.get('/:id', providerController.one);
router.post('/', providerController.create);
router.put('/:id', providerController.update);
router.delete('/:id', providerController.remove);

module.exports = router;
