const express = require('express');
const providerController = require('./provider.controller');
const { providerParamsSchema, providerSchema } = require('./provider.schema');
const { validateParams, validateBody } = require('../../middlewares/validate');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: Provider management and retrieval
 */

/**
 * @swagger
 *  /providers:
 *    get:
 *      summary: Retrieve a list of providers
 *      description: Retrieve a list of providers
 *      tags:
 *        - Providers
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: providers
 */
router.get('/', providerController.list);

/**
 * @swagger
 *  /providers/{id}:
 *    get:
 *      summary: Retrieve a particular provider
 *      description: Retrieve a particular provider
 *      tags:
 *        - Providers
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: provider
 */
router.get('/:id', validateParams(providerParamsSchema), providerController.one);

/**
 * @swagger
 *  /providers:
 *    post:
 *      summary: Create a provider
 *      description: Create a provider
 *      tags:
 *        - Providers
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: provider
 */
router.post('/', validateBody(providerSchema), providerController.create);

/**
 * @swagger
 *  /providers/{id}:
 *    put:
 *      summary: Update a provider
 *      description: Update a provider
 *      tags:
 *        - Providers
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: provider
 */
router.put('/:id', validateParams(providerParamsSchema), validateBody(providerSchema), providerController.update);

/**
 * @swagger
 *  /providers/{id}:
 *    delete:
 *      summary: Delete a provider
 *      description: Delete a provider
 *      tags:
 *        - Providers
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: provider
 */
router.delete('/:id', validateParams(providerParamsSchema), providerController.remove);

module.exports = router;
