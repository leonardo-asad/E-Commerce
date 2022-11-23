const pool = require('./dbConfig').pool;

const verifyCartId = (request, response, next, cartId) => {
  pool.query("SELECT * FROM cart WHERE id = $1",
  [cartId],
  (error, results) => {
    if (error) {
      return response.status(500).send("Error During DB query: Verify Cart Id.");
    };
    if (results.rows.length === 0) {
      return response.status(400).send("Non-Existent Cart");
    };
    request.cartId = results.rows[0].id;
    next();
  });
};

const isUserCart = (request, response, next) => {
  const cartId = request.cartId;

  pool.query(
    `
    SELECT users.id
    FROM users
    JOIN cart
      ON users.id = cart.user_id
    WHERE cart.id = $1;
    `,
    [cartId],
    (error, results) => {
      if (error) {
        return response.status(500).send("Error During DB query: Verify Is User Cart.");
      }
      if (results.rows[0].id !== request.user.id) {
        return response.status(401).send("Unauthorized");
      }
      next();
    });
};

const getProductsByCartId = (request, response, next) => {
  const id = request.cartId;

  pool.query(
  `
  SELECT
    carts_products.id,
    product.id as product_id,
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
  AND product.active = TRUE;
  `,
  [id],
  (error, results) => {
    if (error) {
      return response.status(500).send("Error During DB query: Get Products By Cart Id");
    };
    if (results.rows.length === 0) {
      return response.send("Empty Cart");
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
  const id = parseInt(request.cartId);

  pool.query(
    `
    SELECT SUM(product.price*carts_products.quantity) as total_price
    FROM carts_products
    JOIN product
      ON carts_products.product_id = product.id
    WHERE cart_id = $1 AND active = TRUE;
    `,
    [id],
    (error, results) => {
      if (error) {
        return response.status(500).send("Error During DB query: Get Cart Price.");
      };
      request.totalPay = results.rows[0].total_price;
      next();
    });
};

const verifyStock = (request, response, next) => {
  const id = parseInt(request.cartId);

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
    [id],
    (error, results) => {
      if (error) {
        return response.status(500).send("Error During DB query: Verify Stock.");
      };
      if (results.rows.length > 0) {
        return response.json({
          message: "The following products are Out of Stock, please update your order",
          products: results.rows
        })};
      next();
    }
  )
}

module.exports = {
  verifyCartId,
  getProductsByCartId,
  createCart,
  verifyStock,
  getCartPrice,
  emptyCart,
  isUserCart,
};
