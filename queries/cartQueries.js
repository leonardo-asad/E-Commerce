const pool = require('./dbConfig').pool;

const getProductsByCartId = (request, response, next) => {
  const cartId = parseInt(request.cartId);

  pool.query(
  `
  WITH previous_query AS (
    SELECT product_id, SUM(quantity) as quantity_order
    FROM carts_products
    GROUP BY product_id, cart_id
    HAVING cart_id = $1
  )
  SELECT id, name, quantity as in_stock, quantity_order, price, quantity_order*price as total_price
  FROM previous_query
  JOIN product
    ON previous_query.product_id = product.id
  WHERE active = TRUE;
  `,
  [cartId],
  (error, results) => {
    if (error) {
      return response.status(500).send("Error During DB query: Get Products By Cart Id");
    }
    if (results.rows.length === 0) {
      return response.send("Empty Cart");
    };
    request.products = results.rows;
    next();
  });
};

const emptyCart = (request, response, next) => {
  const cartId = parseInt(request.cartId);

  pool.query(
    `
    DELETE FROM carts_products
    WHERE cart_id = $1;
    `,
    [cartId],
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
    SELECT SUM(price) as total_price
    FROM carts_products
    JOIN product
      ON carts_products.product_id = product.id
    WHERE cart_id = $1 AND active = TRUE;
    `,
    [cartId],
    (error, results) => {
      if (error) {
        return response.status(500).send("Error During DB query: Get Cart Price.");
      }
      request.totalPay = results.rows[0].total_price;
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

const addProductToCart = (request, response, next) => {
  const cartId = parseInt(request.cartId);
  const { productId, quantity } = request.body;

  pool.query("INSERT INTO carts_products (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
  [cartId, productId, quantity],
  (error, results) => {
    if (error) {return next(error);}
    response.status(201).send(`Added Product Id: ${productId} to cart Id: ${cartId}`);
  });
};

const verifyCartId = (request, response, next, id) => {
  const cartId = parseInt(id);

  pool.query("SELECT * FROM cart WHERE id = $1",
  [cartId],
  (error, results) => {
    if (error) {
      return response.status(500).send("Error During DB query: Verify Cart Id.");
    }
    if (results.rows.length === 0) {
      return response.send("Non-Existent Cart");
    }
    request.cartId = results.rows[0].id;
    next();
  });
};

const verifyStock = (request, response, next) => {
  const cartId = parseInt(request.cartId);

  pool.query(
    `
    WITH previous_query AS (
      SELECT product_id, SUM(quantity) as quantity_order
      FROM carts_products
      GROUP BY product_id, cart_id
      HAVING cart_id = $1
    )
    SELECT id, name, quantity as in_stock, quantity_order
    FROM previous_query
    JOIN product
      ON previous_query.product_id = product.id
    WHERE active = TRUE AND quantity_order > quantity;
    `,
    [cartId],
    (error, results) => {
      if (error) {
        return response.status(500).send("Error During DB query: Verify Stock.");
      }
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
  getProductsByCartId,
  createCart,
  addProductToCart,
  verifyCartId,
  getCartPrice,
  verifyStock,
  emptyCart,
};
