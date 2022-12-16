const cartRouter = require('express').Router();
const dbCart = require('../db/cartQueries');
const dbCartsProducts = require('../db/cartsProductsQueries');
const dbOrder = require('../db/orderQueries');
const dbProduct = require('../db/productQueries');
const userPermissions = require('../permissions/userPermissions');
const stripe = require('stripe')('sk_test_xLhH7sntJEJFllhPZwbGU0Sj');

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

// Get Order Details, Create Order, Update Product Stock
cartRouter.post('/mine/checkout',
  userPermissions.isLoggedIn,
  dbCart.getCartId,
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

// Verify Stock
cartRouter.get('/mine/verify-stock',
  userPermissions.isLoggedIn,
  dbCart.getCartId,
  dbCart.verifyStock,
  (request, response) => {
    return response.status(200).send("ok")
  }
)

// Create Payment Intent
cartRouter.post('/mine/create-payment-intent',
  userPermissions.isLoggedIn,
  dbCart.getCartId,
  dbCart.getCartPrice,
  async (request, response) => {
  const amount = request.totalPay;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "nzd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  response.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = cartRouter;
