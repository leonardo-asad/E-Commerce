const pool = require('./dbConfig').pool;

const updateCartItem = (request, response, next) => {
  const id = parseInt(request.params.id);
  const { quantity } = request.body;

  pool.query(
    `
    UPDATE carts_products
    SET quantity = $1
    WHERE id = $2
    RETURNING *
    `,
    [quantity, id],
    (error, results) => {
      if (error) {return next(error);}
      return response.send(
        `Order Updated successfilly.
        Cart Id: ${results.rows[0].cart_id}.
        Product Id: ${results.rows[0].product_id}.
        New quantity: ${results.rows[0].quantity}
        `
      )
    });
};

const removeProductFromCart = (request, response, next) => {
  const id = parseInt(request.params.id);

  pool.query(
    `
    DELETE FROM carts_products
    WHERE id = $1
    `,
    [id],
    (error, results) => {
      if (error) {return next(error);}
      response.status(204).send(`Id: ${id} deleted successfully`);
    });
};

const addProductToCart = (request, response, next) => {
  const { cartId, productId, quantity } = request.body;

  pool.query("INSERT INTO carts_products (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
  [cartId, productId, quantity],
  (error, results) => {
    if (error) {return next(error);}
    response.status(201).send(`Added Product Id: ${productId} to cart Id: ${cartId}`);
  });
};

module.exports = {
  updateCartItem,
  addProductToCart,
  removeProductFromCart,
}
