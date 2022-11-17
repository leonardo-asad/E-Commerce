const cartRouter = require('express').Router();
const dbCart = require('../queries/cartQueries');
// const dbOrder = require('../queries/orderQueries');
// const dbProduct = require('../queries/productQueries');
// const userPermissions = require('../permissions/userPermissions');

//cartRouter.param('cartId', dbCart.verifyCartId);

cartRouter.get('/', dbCart.getAllCartItems , dbCart.getCartItemsByCartId, (request, response) => {
  response.status(200).json(request.products);
});

// cartRouter.put('/:itemId', dbCart.updateCartItem);

// cartRouter.post('/', userPermissions.isLoggedIn, dbCart.createCart);

// cartRouter.post('/:cartId', userPermissions.isLoggedIn, dbCart.addProductToCart);

// cartRouter.post('/:id/checkout',
//   userPermissions.isLoggedIn,
//   dbCart.verifyStock,
//   dbCart.getProductsByCartId,
//   dbCart.getCartPrice,
//   dbOrder.createOrder,
//   dbCart.emptyCart,
//   dbProduct.updateProductStock,
//   (request, response) => {
//     response.json({
//       message: "Operation executed successfully!",
//       purchases: request.products,
//       totalDue: request.totalPay
//     });
//   });

module.exports = cartRouter;
