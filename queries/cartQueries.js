const pool = require('./dbConfig').pool;

const getProductsByCartId = (request, response, next) => {
  const cartId = parseInt(request.cartId);

  pool.query(
  `
  SELECT name, description, url_image, quantity, price, date
  FROM carts_products
  JOIN product
    ON carts_products.product_id = product.id
  WHERE cart_id = $1 AND active = TRUE;
  `,
  [cartId],
  (error, results) => {
    if (error) {return next(error);}
    response.status(200).json(results.rows);
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
  const { productId } = request.body;

  pool.query("INSERT INTO carts_products (cart_id, product_id) VALUES ($1, $2) RETURNING *",
  [cartId, productId],
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
    if (error) {return next(error);}
    if (results.rows.length === 0) {
      return response.status(400).send("Non Existent Cart Selected")
    }
    request.cartId = results.rows[0].id;
    next();
  });
};

module.exports = {
  getProductsByCartId,
  createCart,
  addProductToCart,
  verifyCartId,
};
