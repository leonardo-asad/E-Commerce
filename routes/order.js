const orderRouter = require('express').Router();
const db = require('../queries/orderQueries')
const userPermissions = require('../permissions/userPermissions')

// Apply to all Routes: Only authenticated users.

// Get All User Orders
orderRouter.get('/', userPermissions.isLoggedIn, db.getUserOrders);

// Retrieve an order
orderRouter.get('/:id', userPermissions.isLoggedIn, db.getUserOrderByOrderId);

module.exports = orderRouter;
