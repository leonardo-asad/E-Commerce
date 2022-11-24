const orderRouter = require('express').Router();
const db = require('../queries/orderQueries')
const userPermissions = require('../permissions/userPermissions')

// Get All User Orders
orderRouter.get('/mine', userPermissions.isLoggedIn, db.getUserOrders);

// Retrieve an order
orderRouter.get('/mine/:id', userPermissions.isLoggedIn, db.getUserOrderByOrderId);

module.exports = orderRouter;
