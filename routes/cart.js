const cartRouter = require('express').Router();
const dbCart = require('../queries/cartQueries');
const dbCartsProducts = require('../queries/cartsProductsQueries');
const dbOrder = require('../queries/orderQueries');
const dbProduct = require('../queries/productQueries');
const userPermissions = require('../permissions/userPermissions');

// Create Cart
cartRouter.post('/',
userPermissions.isLoggedIn,
dbCart.createCart
);

// Get Products of User's Cart
cartRouter.get('/mine',
  userPermissions.isLoggedIn,
  dbCart.getCartId,
  dbCart.getProductsByCartId,
  (request, response) => {
    response.status(200).json(request.products);
});

// Add Products to User's Cart
cartRouter.post('/mine',
  userPermissions.isLoggedIn,
  dbCart.getCartId,
  dbCartsProducts.addProductToCart
);

// Update Cart Item
cartRouter.put('/mine/:productId',
  userPermissions.isLoggedIn,
  dbCart.getCartId,
  dbCartsProducts.updateCartItem
);

// Remove Product from Cart
cartRouter.delete('/mine/:productId',
  userPermissions.isLoggedIn,
  dbCart.getCartId,
  dbCartsProducts.removeProductFromCart
);

// Verify Stock, Get Order Details, Create Order, Update Product Stock
cartRouter.post('/mine/checkout',
  userPermissions.isLoggedIn,
  dbCart.getCartId,
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
