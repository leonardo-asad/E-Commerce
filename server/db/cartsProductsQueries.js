const pool = require('./dbConfig').pool;

const updateCartItem = (request, response, next) => {
  const product_id = parseInt(request.params.productId);
  const { quantity } = request.body;

  pool.query(
    `
    UPDATE carts_products
    SET quantity = $1
    WHERE cart_id = $2 AND product_id = $3
    RETURNING *
    `,
    [quantity, request.cartId, product_id],
    (error, results) => {
      if (error) {return next(error);}
      if (results.rows.length === 0) {
        return response.status(400).send("Doesn't found a valid record to update")
      };
      return response.json({
        'cart_id': results.rows[0].cart_id,
        'product_id': results.rows[0].product_id,
        'updated_quantity': results.rows[0].quantity
      })
    });
};

const removeProductFromCart = (request, response, next) => {
  const product_id = parseInt(request.params.productId);

  pool.query(
    `
    DELETE FROM carts_products
    WHERE cart_id = $1 AND product_id = $2
    `,
    [request.cartId, product_id],
    (error, results) => {
      if (error) {return next(error);}
      response.status(200).json({
        product_id: product_id
      })
    });
};

const addProductToCart = (request, response, next) => {
  const cartId = request.cartId;
  const { productId, quantity } = request.body;

  pool.query(
    `
    WITH insert_query AS (
      INSERT INTO carts_products (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
    )
    SELECT
        insert_query.id,
        product.id as product_id,
        product.name,
        product.url_image,
        product.quantity as in_stock,
        insert_query.quantity as quantity_order,
        product.price as price,
        product.price*insert_query.quantity as total_price
    FROM insert_query
    JOIN product
      ON insert_query.product_id = product.id;
    `,
  [cartId, productId, quantity],
  (error, results) => {
    if (error) {return next(error);}
    response.status(201).send(results.rows[0]);
  });
};

module.exports = {
  updateCartItem,
  addProductToCart,
  removeProductFromCart,
}
