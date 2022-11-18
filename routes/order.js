const orderRouter = require('express').Router();
const db = require('../queries/orderQueries')
const userPermissions = require('../permissions/userPermissions')

orderRouter.get('/', userPermissions.isLoggedIn, db.getUserOrders);

orderRouter.get('/:id', userPermissions.isLoggedIn, db.getUserOrderByOrderId);

module.exports = orderRouter;
