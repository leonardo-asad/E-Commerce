const productRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const db = require('../queries/productQueries');

productRouter.param('id', db.checkProductId);

/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *         nullable: true
 *       url_image:
 *         type: string
 *         nullable: true
 *       quantity:
 *         type: integer
 *       price:
 *         type: number
 *       date:
 *         type: string
 *         nullable: true
 *       active:
 *         type: boolean
 *       user_id:
 *         type: integer
 *
 *   NewProduct:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *         nullable: true
 *       url_image:
 *         type: string
 *         nullable: true
 *       quantity:
 *         type: integer
 *       price:
 *         type: number
 *       categories:
 *         type: array
 *         items:
 *           type: string
 */

/**
 * @swagger
 * /product:
 *   get:
 *     tags:
 *       - Product
 *     summary: Return all Products
 *     parameters:
 *       - name: active
 *         description: Filter only active publications
 *         in: query
 *         required: true
 *         type: boolean
 *       - name: category
 *         description: Filter products by category
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 */
productRouter.get('/', db.getProducts, db.getProductsByCategory);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Returns a single product
 *     parameters:
 *       - name: id
 *         description: Product id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       500:
 *         description: Server error
 *       400:
 *         description: Bad Request
 */
productRouter.get('/:id', db.getProductById);

/**
 * @swagger
 * /product:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Product
 *     summary: Creates a new product
 *     requestBody:
 *       description: New Product object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/NewProduct'
 *     responses:
 *       201:
 *         description: Successfully created
 *       401:
 *         description: Unauthorized. Log In Required.
 *       500:
 *         description: Error during DB query.
 *       400:
 *         description: Bad Request. The name of the product already exists.
 */
productRouter.post('/', userPermissions.isLoggedIn, db.createProduct, db.associateCategory);

module.exports = productRouter;
