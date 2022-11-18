const orderRouter = require('express').Router();
const db = require('../queries/orderQueries')
const userPermissions = require('../permissions/userPermissions')

orderRouter.get('/', userPermissions.isLoggedIn, db.getUserOrders);

module.exports = orderRouter;
