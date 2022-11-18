const pool = require('./dbConfig').pool;

const getProducts = (request, response, next) => {
  if (request.query.hasOwnProperty('category')) {
    request.category = request.query.category;
    return next();
  }
  pool.query("SELECT * FROM product WHERE active = TRUE ORDER BY id ASC", (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(200).json(results.rows);
  });
};

const getProductsByCategory = (request, response, next) => {
  pool.query(
    `
    SELECT *
    FROM product
    JOIN products_categories
    ON
      product.name = products_categories.product_name
    WHERE category_name = $1 AND active = TRUE;
    `,
    [request.category],
    (error, results) => {
      if (error) {return next(error);}
      response.status(200).json(results.rows);
    }
  );
};

const getProductById = (request, response, next) => {
  const id = parseInt(request.id);

  pool.query("SELECT * FROM product WHERE id = $1", [id], (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(200).json(results.rows);
  });
};

const checkProductId = (request, response, next, id) => {
  pool.query("SELECT * FROM product WHERE id = $1", [id], (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.rows.length === 0) {
      return response.status(400).send("Non-Existent Product");
    }
    request.id = id;
    next();
  });
};

const createProduct = (request, response, next) => {
  const {
    name,
    description,
    url_image,
    quantity,
    price,
    categories,
  } = request.body;

  pool.query(
    "INSERT INTO product (name, description, url_image, quantity, price, date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [name, description || "NULL", url_image || "NULL", parseInt(quantity), parseFloat(price), new Date(), request.user.id],
    (error, newProduct) => {
      if (error) {
        return next(error);
      }
      request.newProduct = {
        newProduct: newProduct.rows[0],
        categories: categories
      }
      next();
    }
  );
};

const associateCategory = async (request, response, next) => {
  const { newProduct, categories } = request.newProduct;

  await categories.forEach(category => {
    pool.query(
      "INSERT INTO products_categories (product_name, category_name) VALUES ($1, $2)",
      [newProduct.name, category],
      (error) => {
        if (error) {return next(error);}
      });
  });
  response.status(201).send(`New Product with ID: ${newProduct.id} associated with categories: ${categories}`);
};

const updateProductStock = async (request, response, next) => {
  const products = request.products;

  await products.forEach(product => {
    pool.query(
      `
      UPDATE product
      SET quantity = quantity -$1
      WHERE id = $2;
      `,
      [product.quantity_order, product.product_id],
      (error, results) => {
        if (error) {
          return response.status(500).send("Error During DB query: Update Product Stock.");
        };
      });
  });
  console.log("Stock Updated Successfully");
  next();
};

module.exports = {
  getProducts,
  getProductById,
  checkProductId,
  createProduct,
  associateCategory,
  getProductsByCategory,
  updateProductStock,
}
