const express = require('express');
const clientRoutes = require('./client/client.routes');
const providerRoutes = require('./provider/provider.routes');

const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/providers', providerRoutes);

module.exports = router;
