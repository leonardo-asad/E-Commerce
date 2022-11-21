const usersRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../queries/userQueries');

/**
 * @swagger
 * definitions:
 *   User:
 *    properties:
 *      username:
 *        type: string
 *      password:
 *        type: string
 */

usersRouter.param('id', db.checkUserId);

usersRouter.get('/', userPermissions.isLoggedIn, db.getUsers);

usersRouter.get('/:id', userPermissions.isLoggedIn, db.getUserById);

// Update User Profile
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

/**
 * @swagger
 * /users/login:
 *   post:
 *     security: []
 *     tags:
 *       - Authentication
 *     description: Logs in and returns the authentication cookie.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: A JSON object containing the username and password.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully Authenticated
 */
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
