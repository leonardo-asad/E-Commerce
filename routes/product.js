const productRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const db = require('../queries/productQueries');

productRouter.param('id', db.checkProductId);

/**
 * @swagger
 * definitions:
 *   Product:
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
  *   NewProduct:
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
 *     description: Return all Products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category
 *         description: Filter products by category
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of products
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Product'
 */
productRouter.get('/', db.getProducts, db.getProductsByCategory);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     description: Returns a single product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Product's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single product
 *         schema:
 *           $ref: '#/definitions/Product'
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
 *     description: Creates a new product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: Product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewProduct'
 *     responses:
 *       201:
 *         description: Successfully created
 */
productRouter.post('/', userPermissions.isLoggedIn, db.createProduct, db.associateCategory);

module.exports = productRouter;
