const cartRouter = require('express').Router();
const db = require('../queries/cartQueries');
const userPermissions = require('../permissions/userPermissions');

cartRouter.param('id', db.verifyCartId);

cartRouter.get('/:id', db.getProductsByCartId);

cartRouter.post('/', userPermissions.isLoggedIn, db.createCart);

cartRouter.post('/:id', userPermissions.isLoggedIn, db.addProductToCart);

module.exports = cartRouter;
