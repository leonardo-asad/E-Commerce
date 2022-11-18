const cartsProductsRouter = require('express').Router();
db = require('../queries/cartsProductsQueries');

cartsProductsRouter.put('/:id', db.updateCartItem);

cartsProductsRouter.post('/', db.addProductToCart);

cartsProductsRouter.delete('/:id', db.removeProductFromCart);

module.exports = cartsProductsRouter;
