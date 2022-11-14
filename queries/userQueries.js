require('dotenv').config();
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerceapp',
  password: process.env.PASSWORD,
  port: 5432,
});

const getUsers = (request, response, next) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(200).json(results.rows);
  });
};


const getUserById = (request, response, next) => {
  const id = parseInt(request.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(200).json(results.rows);
  });
};

const checkUserId = (request, response, next, id) => {
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      return next(error);
    }
    if (results.rows.length === 0) {
      return response.status(400).send("Non-Existent User");
    }
    request.id = id;
    next();
  })

}

const createUser = (request, response, next) => {
  const {username, password} = request.newUser;

  pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password],
    (error, results) => {
      if (error) {
        return next(error);
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateUser = (request, response, next) => {
  const id = parseInt(request.id);
  const { username, password } = request.body;

  pool.query("UPDATE users SET username = $1, password = $2 WHERE id = $3", [username, password, id], (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(200).send(`User modified with ID: ${id}`);
  })
}

const deleteUser = (request, response, next) => {
  const id = parseInt(request.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(204).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  checkUserId,
}
