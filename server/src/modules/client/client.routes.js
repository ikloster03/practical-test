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
 *      responses:
 *        200:
 *          description: A list of clients.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Client'
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
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the client to retrieve.
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: A client.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Client'
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
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The client's name.
 *                  example: Kelley Rempel
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The client's email.
 *                  example: kelley.rempel@example.com
 *                phone:
 *                  type: string
 *                  description: The client's phone.
 *                  example: 5333378090
 *                providers:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: The client's providers.
 *                  example: []
 *              required:
 *                - name
 *                - email
 *                - phone
 *      responses:
 *        200:
 *          description: A client.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Client'
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
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the client to retrieve.
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The client's name.
 *                  example: Kelley Rempel
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The client's email.
 *                  example: kelley.rempel@example.com
 *                phone:
 *                  type: string
 *                  description: The client's phone.
 *                  example: 5333378090
 *                providers:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: The client's providers.
 *                  example: []
 *      responses:
 *        200:
 *          description: A client.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Client'
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
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the client to retrieve.
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: A client.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Client'
 */
router.delete('/:id', validateParams(clientParamsSchema), clientController.remove);

module.exports = router;
