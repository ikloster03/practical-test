const express = require('express');
const clientController = require('./client.controller');

const router = express.Router();

router.get('/', clientController.list);
router.get('/:id', clientController.one);
router.post('/', clientController.create);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.remove);

module.exports = router;
