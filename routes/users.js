const usersRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../queries/userQueries');

usersRouter.param('id', db.checkUserId);

usersRouter.get('/', userPermissions.isLoggedIn, db.getUsers);

usersRouter.get('/:id', userPermissions.isLoggedIn, db.getUserById);

usersRouter.put(
  '/:id',
  userPermissions.isLoggedIn,
  userPermissions.isOwnProfile,
  async (request, response, next) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).send("Username or Password not Provided");
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      request.updatedUser = { username: username, password: hashedPassword };
      next();
    } catch (error) {
      response.status(500).send(error.message || "Server Failure: Bcrypt")
    }
  },
  db.updateUser
  );

usersRouter.delete(
  '/:id',
  userPermissions.isLoggedIn,
  userPermissions.isOwnProfile,
  db.deleteUser
  );

// Authenticate Users Routes

// Register User Account
usersRouter.post('/register', async (request, response, next) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).send("Username or Password not Provided");
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      request.newUser = { username: username, password: hashedPassword };
      next();
    } catch (error) {
      response.status(500).send(error.message || "Server Failure: Bcrypt")
    }
  },
  db.createUser
  );

// Log In
usersRouter.post('/login',
  passport.authenticate('local'),
  (request, response) => {
    response.send(`User Authenticated`);
    console.log(request.user);
  }
);

// Log Out
usersRouter.post('/logout', (request, response, next) => {
  request.logout(error => {
    if (error) { return next(error); }
    response.send("Successfully Logged Out")
  })
});

module.exports = usersRouter;
