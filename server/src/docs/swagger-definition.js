const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Practical test API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

module.exports = swaggerDefinition;
