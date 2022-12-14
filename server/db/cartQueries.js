const pool = require('./dbConfig').pool;

const getCartId = (request, response, next) => {

  const userId = request.user.id;

  pool.query(
    `
    SELECT id
    FROM cart
    WHERE user_id = $1;
    `,
    [userId],
    (error, results) => {
      if (error) {return response.status(500).send("Error During DB query: get Cart Id");}
      if (results.rows.length === 0) {return response.send("Non-Existent Cart")}
      request.cartId = results.rows[0].id;
      next();
    }
  );
};

const getProductsByCartId = (request, response, next) => {
  const cartId = request.cartId;

  pool.query(
  `
  SELECT
    carts_products.id,
    product.id as product_id,
    product.name,
    product.url_image,
    product.quantity as in_stock,
    carts_products.quantity as quantity_order,
    product.price as price,
    product.price*carts_products.quantity as total_price
  FROM cart
  JOIN carts_products
    ON cart.id = carts_products.cart_id
  JOIN product
    ON carts_products.product_id = product.id
  WHERE cart.id = $1
  AND product.active = TRUE;
  `,
  [cartId],
  (error, results) => {
    if (error) {
      return response.status(500).send("Error During DB query: Get Products By Cart Id");
    };
    request.products = results.rows;
    next();
  });
};

const createCart = (request, response, next) => {
  const userId = parseInt(request.user.id);

  pool.query("INSERT INTO cart (user_id) VALUES ($1) RETURNING *",
  [userId],
  (error, results) => {
    if (error) {return next(error);}
    response.status(201).send(`Created new Cart with Id: ${results.rows[0].id}`);
  });
};

const emptyCart = (request, response, next) => {
  const id = parseInt(request.cartId);

  pool.query(
    `
    DELETE FROM carts_products
    WHERE cart_id = $1;
    `,
    [id],
    (error, results) => {
      if (error) {
        return response.status(500).send("Error During DB query: Empty Cart.");
      };
      console.log("Cart Emptied Successfully");
      next();
    }
  );
};

const getCartPrice = (request, response, next) => {
  const cartId = parseInt(request.cartId);

  pool.query(
    `
    SELECT SUM(product.price*carts_products.quantity) as total_price
    FROM carts_products
    JOIN product
      ON carts_products.product_id = product.id
    WHERE cart_id = $1 AND active = TRUE;
    `,
    [cartId],
    (error, results) => {
      if (error) {
        return response.status(500).send("Error During DB query: Get Cart Price.");
      };
      request.totalPay = results.rows[0].total_price;
      next();
    });
};

const verifyStock = (request, response, next) => {
  const cartId = parseInt(request.cartId);

  pool.query(
    `
      SELECT
        carts_products.id,
        product.name,
        product.quantity as in_stock,
        carts_products.quantity as quantity_order,
        product.price as price,
        product.price*carts_products.quantity as total_price
      FROM cart
      JOIN carts_products
        ON cart.id = carts_products.cart_id
      JOIN product
        ON carts_products.product_id = product.id
      WHERE cart.id = $1
      AND carts_products.quantity > product.quantity
      AND product.active = TRUE;
    `,
    [cartId],
    (error, results) => {
      if (error) {
        return response.status(500).send("Error During DB query: Verify Stock.");
      };
      if (results.rows.length > 0) {
        return response.status(400).json({
          message: "Some of the products are Out of Stock, please update your order",
          products: results.rows
        })};
      next();
    }
  )
}

module.exports = {
  getProductsByCartId,
  createCart,
  verifyStock,
  getCartPrice,
  emptyCart,
  getCartId,
};
