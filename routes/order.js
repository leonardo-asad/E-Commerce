const orderRouter = require('express').Router();
const db = require('../queries/orderQueries')
const userPermissions = require('../permissions/userPermissions')

/**
 * @swagger
 * definitions:
 *   Order:
 *     type: object
 *     properties:
 *       order_id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       quantity:
 *         type: integer
 *       price:
 *         type: number
 *       date:
 *         type: string
 */

// Apply to all Routes: Only authenticated users.

// Get All User Orders
/**
 * @swagger
 * /order:
 *   get:
 *     tags:
 *       - Order
 *     security:
 *       - cookieAuth: []
 *     summary: Get All Orders
 *     description: >
 *       Only Authenticated Users
 *       Only User Orders
 *     responses:
 *       200:
 *         description: An array of Orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       401:
 *         description: Unauthorized
 */
orderRouter.get('/', userPermissions.isLoggedIn, db.getUserOrders);

// Retrieve an order
/**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags:
 *       - Order
 *     security:
 *       - cookieAuth: []
 *     summary: Get a single Order by Id
 *     description: >
 *       Only Authenticated Users
 *       Only User Orders
 *     parameters:
 *       - name: id
 *         description: Order Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An object with the Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
orderRouter.get('/:id', userPermissions.isLoggedIn, db.getUserOrderByOrderId);

module.exports = orderRouter;
