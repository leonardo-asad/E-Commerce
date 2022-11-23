const cartRouter = require('express').Router();
const dbCart = require('../queries/cartQueries');
const dbCartsProducts = require('../queries/cartsProductsQueries');
const dbOrder = require('../queries/orderQueries');
const dbProduct = require('../queries/productQueries');
const userPermissions = require('../permissions/userPermissions');

cartRouter.param('cartId', dbCart.verifyCartId);

cartRouter.post('/',
userPermissions.isLoggedIn,
dbCart.createCart
);

cartRouter.get('/:cartId',
  userPermissions.isLoggedIn,
  dbCart.isUserCart,
  dbCart.getProductsByCartId,
  (request, response) => {
    response.status(200).json(request.products);
});

cartRouter.post('/:cartId',
  userPermissions.isLoggedIn,
  dbCart.isUserCart,
  dbCartsProducts.addProductToCart
);

cartRouter.put('/:cartId/:productId',
  userPermissions.isLoggedIn,
  dbCart.isUserCart,
  dbCartsProducts.updateCartItem
);

// Remove Product in Cart
cartRouter.delete('/:cartId/:productId',
  userPermissions.isLoggedIn,
  dbCart.isUserCart,
  dbCartsProducts.removeProductFromCart
);

cartRouter.post('/:cartId/checkout',
  userPermissions.isLoggedIn,
  dbCart.isUserCart,
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
  }
);

module.exports = cartRouter;
