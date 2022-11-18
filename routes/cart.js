const cartRouter = require('express').Router();
const dbCart = require('../queries/cartQueries');
const dbOrder = require('../queries/orderQueries');
const dbProduct = require('../queries/productQueries');
const userPermissions = require('../permissions/userPermissions');

cartRouter.param('id', dbCart.verifyCartId);

cartRouter.get('/:id', dbCart.getProductsByCartId, (request, response) => {
  response.status(200).json(request.products);
});

cartRouter.post('/', userPermissions.isLoggedIn, dbCart.createCart);

cartRouter.post('/:id/checkout',
  userPermissions.isLoggedIn,
  dbCart.verifyStock,
  dbCart.getProductsByCartId,
  dbCart.getCartPrice,
  dbOrder.createOrder,
  dbCart.emptyCart,
  dbProduct.updateProductStock,
  (request, response) => {
    response.json({
      message: "Operation executed successfully!",
      purchases: request.products,
      totalDue: request.totalPay
    });
  });

module.exports = cartRouter;
