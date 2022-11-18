const cartRouter = require('express').Router();
const dbCart = require('../queries/cartQueries');
const dbCartsProducts = require('../queries/cartsProductsQueries');
const dbOrder = require('../queries/orderQueries');
const dbProduct = require('../queries/productQueries');
const userPermissions = require('../permissions/userPermissions');

cartRouter.param('cartId', dbCart.verifyCartId);

// Apply to all Routes: Only authenticated Users are allowed to see their own Carts.

// Get Cart Products By Cart Id.
cartRouter.get('/:cartId',
  userPermissions.isLoggedIn,
  dbCart.isUserCart,
  dbCart.getProductsByCartId,
  (request, response) => {
    response.status(200).json(request.products);
});

// Create Cart
cartRouter.post('/',
  userPermissions.isLoggedIn,
  dbCart.createCart
  );

// Add Product to Cart
cartRouter.post('/:cartId',
  userPermissions.isLoggedIn,
  dbCart.isUserCart,
  dbCartsProducts.addProductToCart
);

// Update Product in Cart
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

// Checkout - Verify Stock, Get Total Due and Order Details, Create Order, Update Product Stock
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
  });

module.exports = cartRouter;
