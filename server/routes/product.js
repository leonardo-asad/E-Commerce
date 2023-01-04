const productRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const db = require('../db/productQueries');

productRouter.param('id', db.checkProductId);

productRouter.get(
  '/',
  db.countProducts,
  db.countProductsByCategory,
  db.getProducts,
  db.getProductsByCategory
  );

productRouter.get('/:id', db.getProductById);

productRouter.post('/', userPermissions.isLoggedIn, db.createProduct, db.associateCategory);

module.exports = productRouter;
