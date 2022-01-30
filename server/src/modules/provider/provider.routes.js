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
 *      responses:
 *        200:
 *          description: A list of providers.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Provider'
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
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the provider to retrieve.
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: A provider.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Provider'
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
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The provider's name.
 *                  example: Runolfsdottir, Roberts and Stiedemann
 *              required:
 *                - name
 *      responses:
 *        200:
 *          description: A provider.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Provider'
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
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the provider to retrieve.
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
 *                  description: The provider's name.
 *                  example: Runolfsdottir, Roberts and Stiedemann
 *      responses:
 *        200:
 *          description: A provider.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Provider'
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
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the provider to retrieve.
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: A provider.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Provider'
 */
router.delete('/:id', validateParams(providerParamsSchema), providerController.remove);

module.exports = router;
