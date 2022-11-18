const productRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const db = require('../queries/productQueries');

productRouter.param('id', db.checkProductId);

// Get all Listed Products
productRouter.get('/', db.getProducts, db.getProductsByCategory);

// Retrieve a product
productRouter.get('/:id', db.getProductById);

// Create product
productRouter.post('/', userPermissions.isLoggedIn, db.createProduct, db.associateCategory);

module.exports = productRouter;
