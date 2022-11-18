const pool = require('./dbConfig').pool;

const getUserOrders = (request, response, next) => {
  pool.query(
    `
    SELECT product.name, product.description, users_orders.quantity, users_orders.price, users_orders.date
    FROM users_orders
    JOIN product
      ON users_orders.product_id = product.id
    WHERE users_orders.user_id = $1;
    `,
    [request.user.id],
    (error, results) => {
      if (error) {return next(error);}
      response.status(200).json(results.rows);
    });
};

const getUserOrderByOrderId = (request, response, next) => {
  const id = parseInt(request.params.id);

  pool.query(
    `
    SELECT product.name, product.description, users_orders.quantity, users_orders.price, users_orders.date
    FROM users_orders
    JOIN product
      ON users_orders.product_id = product.id
    WHERE users_orders.user_id = $1 AND users_orders.id = $2;
    `,
    [request.user.id, id],
    (error, results) => {
      if (error) {return next(error);}
      if (results.rows.length === 0) {
        return response.send("Non-existent Order");
      }
      response.status(200).send(results.rows[0]);
    });
};

const createOrder = async (request, response, next) => {
  const products = request.products;

  await products.forEach(product => {
    pool.query(
      `
      INSERT INTO users_orders (quantity, price, date, user_id, product_id)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [product.quantity_order, product.price, new Date(), request.user.id, product.product_id],
      (error, results) => {
        if (error) {
          return response.status(500).send("Error During DB query: Create Order.");
        }
      });
  });
  console.log("Order/s created successfully");
  next();
};

module.exports = {
  createOrder,
  getUserOrders,
  getUserOrderByOrderId,
}
