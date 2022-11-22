const cartRouter = require('express').Router();
const dbCart = require('../queries/cartQueries');
const dbCartsProducts = require('../queries/cartsProductsQueries');
const dbOrder = require('../queries/orderQueries');
const dbProduct = require('../queries/productQueries');
const userPermissions = require('../permissions/userPermissions');

cartRouter.param('cartId', dbCart.verifyCartId);

/**
 * @swagger
 * definitions:
 *   CartItem:
 *     type: object
 *     properties:
 *       cart_item_id:
 *         type: integer
 *       product_id:
 *         type: integer
 *       name:
 *         type: string
 *       in_stock:
 *         type: integer
 *       quantity_order:
 *         type: integer
 *       price:
 *         type: number
 *       total_price:
 *         type: number
 *
 *   NewCartItem:
 *     type: object
 *     properties:
 *       productId:
 *         type: integer
 *       quantity:
 *         type: integer
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     summary: Create a Cart
 *     description: >
 *       Only authenticated Users.
 *       Only one cart per user is allowed.
 *     responses:
 *       201:
 *         description: Cart Created Successfully
 *       400:
 *         description: User's Cart has been previously created.
 */
 cartRouter.post('/',
 userPermissions.isLoggedIn,
 dbCart.createCart
 );

/**
 * @swagger
 * /cart/{cartId}:
 *   get:
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     summary: Get all Products in cart.
 *     description: >
 *       Only **Logged Users** are allowed to use this endpoint.
 *       Only User's **Own Cart** is allowed.
 *     parameters:
 *       - name: cartId
 *         in: path
 *         description: cart ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/CartItem'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request, Non-existent cart.
 *
 *   post:
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     summary: Add Product to Cart
 *     description: >
 *       Only authenticated Users allowed.
 *       Only User's cart is allowed
 *     parameters:
 *       - name: cartId
 *         description: Cart Id
 *         in: path
 *         required: true
 *         type: integer
 *     requestBody:
 *       description: An object with the product ID and quantity intended to buy
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/NewCartItem'
 *     responses:
 *       201:
 *         description: Product successfully added to Cart
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
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

/**
 * @swagger
 * /cart/{cartId}/{productId}:
 *   put:
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     summary: Update Item Quantity
 *     description: >
 *       Only authenticated Users allowed.
 *       Only User's cart is allowed
 *     parameters:
 *       - name: cartId
 *         description: Cart Id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: productId
 *         description: Product Id
 *         in: path
 *         required: true
 *         type: integer
 *     requestBody:
 *       description: An object with the updated quantity
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product quantity updated successfully
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 *   delete:
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     summary: Delete Product from Cart
 *     description: >
 *       Only authenticated Users allowed.
 *       Only User's cart is allowed
 *     parameters:
 *       - name: cartId
 *         description: Cart Id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: productId
 *         description: Product Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Product removed successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
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

/**
 * @swagger
 * /cart/{cartId}/checkout:
 *   post:
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     summary: Verify Stock, Get Order Details, Create Order, Update Product Stock
 *     description: >
 *       Only authenticated Users allowed.
 *       Only User's cart is allowed
 *     parameters:
 *       - name: cartId
 *         description: Cart Id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Purchase procesed successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Server Error.
 */
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
