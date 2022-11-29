const pool = require('./dbConfig').pool;

const getAllCategories = (request, response, next) => {
  pool.query("SELECT * FROM category;",
  (error, results) => {
    if (error) {return next(error);}
    return response.status(200).send(results.rows);
  });
};

module.exports = {
  getAllCategories,
}
