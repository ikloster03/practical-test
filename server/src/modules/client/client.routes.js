const express = require('express');
const clientController = require('./client.controller');
const { clientParamsSchema, clientCreatingSchema, clientUpdatingSchema } = require('./client.schema');
const { validateParams, validateBody } = require('../../middlewares/validate');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management and retrieval
 */

/**
 * @swagger
 *  /clients:
 *    get:
 *      summary: Retrieve a list of clients
 *      description: Retrieve a list of clients
 *      tags:
 *        - Clients
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: clients
 */
router.get('/', clientController.list);

/**
 * @swagger
 *  /clients/{id}:
 *    get:
 *      summary: Retrieve a particular client
 *      description: Retrieve a particular client
 *      tags:
 *        - Clients
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: client
 */
router.get('/:id', validateParams(clientParamsSchema), clientController.one);

/**
 * @swagger
 *  /clients:
 *    post:
 *      summary: Create a client
 *      description: Create a client
 *      tags:
 *        - Clients
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: client
 */
router.post('/', validateBody(clientCreatingSchema), clientController.create);

/**
 * @swagger
 *  /clients/{id}:
 *    put:
 *      summary: Update a client
 *      description: Update a client
 *      tags:
 *        - Clients
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: client
 */
router.put('/:id', validateParams(clientParamsSchema), validateBody(clientUpdatingSchema), clientController.update);

/**
 * @swagger
 *  /clients/{id}:
 *    delete:
 *      summary: Delete a client
 *      description: Delete a client
 *      tags:
 *        - Clients
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: client
 */
router.delete('/:id', validateParams(clientParamsSchema), clientController.remove);

module.exports = router;
