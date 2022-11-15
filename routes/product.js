const productRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const db = require('../queries/productQueries');

productRouter.param('id', db.checkProductId);

productRouter.get('/', db.getProducts);

productRouter.get('/:id', db.getProductById);

productRouter.post('/', userPermissions.isLoggedIn, db.createProduct, db.associateCategory);

module.exports = productRouter;
