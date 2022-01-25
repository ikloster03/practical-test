const httpStatus = require('http-status');
const logger = require('../config/logger');
const ApiError = require('../utils/api-error');

const validate = async (schema, data, next) => {
  try {
    await schema.validate(data);
    next();
  } catch (e) {
    logger.error(e);
    next(new ApiError(httpStatus.BAD_REQUEST, e.errors.join(', ')));
  }
};

const validateParams = (schema) => async (req, res, next) => {
  await validate(schema, req.params, next);
};

const validateBody = (schema) => async (req, res, next) => {
  await validate(schema, req.body, next);
};

module.exports = {
  validateParams,
  validateBody,
};
