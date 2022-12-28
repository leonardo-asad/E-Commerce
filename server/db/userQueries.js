const pool = require('./dbConfig').pool;
const bcrypt = require('bcrypt');

const getUsers = (request, response, next) => {
  pool.query("SELECT id, username FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(200).json(results.rows);
  });
};


const getUserById = (request, response, next) => {
  const id = parseInt(request.id);

  pool.query("SELECT id, username FROM users WHERE id = $1", [id], (error, results) => {
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
  });
};

const createUser = (request, response, next) => {
  const {username, password} = request.newUser;

  pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password],
    (error, results) => {
      if (error) {
        return next(error);
      }
      next();
    });
};

const updateUser = (request, response, next) => {
  const id = parseInt(request.id);
  const { username, password } = request.updatedUser;

  pool.query("UPDATE users SET username = $1, password = $2 WHERE id = $3", [username, password, id], (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(200).send(`User modified with ID: ${id}`);
  });
};

const deleteUser = (request, response, next) => {
  const id = parseInt(request.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      return next(error);
    }
    response.status(204).send(`User deleted with ID: ${id}`);
  });
};

const verifyUser = (username, password, cb) => {
  pool.query("SELECT * FROM users WHERE username = $1", [username], async (error, results) => {
    if (error) {
      return cb(error);
    }
    if (results.rows.length === 0) {
      return cb(null, false, {message: "Incorrect Username or Password"});
    }
    const user = results.rows[0];
    try {
      const matchedPasword = await bcrypt.compare(password, user.password);
      if (!matchedPasword) {
        return cb(null, false, {message: "Incorrect Username or Password"})
      }
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  });
};

const googleAuth = (accessToken, refreshToken, profile, cb) => {
  pool.query('SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2', [
    'https://accounts.google.com',
    profile.id
  ], (error, result) => {
    if (error) { return cb(error); }
    if (result.rows.length === 0) {
      pool.query('INSERT INTO users (username) VALUES ($1) RETURNING *', [
        profile.displayName
      ], (error, result) => {
        if (error) { return cb(error); }
        var id = result.rows[0].id;
        pool.query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)', [
          id,
          'https://accounts.google.com',
          profile.id
        ], (error) => {
          if (error) { return cb(error); }
          var user = {
            id: id,
            username: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      pool.query('SELECT * FROM users WHERE id = $1', [ result.rows[0].user_id ], (error, result) => {
        if (error) { return cb(error); }
        if (!result) { return cb(null, false); }
        return cb(null, result.rows[0]);
      });
    }
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  checkUserId,
  verifyUser,
  googleAuth,
}
