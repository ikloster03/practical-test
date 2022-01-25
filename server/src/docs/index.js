const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swagger-definition');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', './src/modules/**/*.js'],
});

router.use('/api-docs', swaggerUi.serve);
router.get(
  '/api-docs',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);

module.exports = router;
