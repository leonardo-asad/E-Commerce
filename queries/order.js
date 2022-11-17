const pool = require('./dbConfig').pool;

const createOrder = async (request, response, next) => {
  const products = request.products;

  await products.forEach(product => {
    pool.query(
      `
      INSERT INTO users_orders (quantity, price, date, user_id, product_id)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [product.quantity_order, product.price, new Date(), request.user.id, product.id],
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
}
