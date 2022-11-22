const usersRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../queries/userQueries');

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *
 *   UserWithoutPassword:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       username:
 *         type: string
 */

usersRouter.param('id', db.checkUserId);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     summary: Return all users
 *     responses:
 *       200:
 *         description: An array of Users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserWithoutPassword'
 */
usersRouter.get('/', db.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Returns a single User by ID
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User Object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserWithoutPassword'
 */
usersRouter.get('/:id', db.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - User
 *     summary: Update User properties
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: integer
 *     requestBody:
 *       description: Updated User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Bad Request. Updated Username or Password not provided.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Server Failure Bcrypt.
 */
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

// Authenticate Users Routes

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new User Account.
 *     requestBody:
 *       description: A JSON object containing the username and password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Successfully Registered
 *       400:
 *         description: Bad Request
 */
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
 *     summary: Logs in and returns the authentication cookie.
 *     requestBody:
 *       description: A JSON object containing the username and password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully Authenticated
 *       400:
 *         description: Bad Request
 */
usersRouter.post('/login',
  passport.authenticate('local'),
  (request, response) => {
    response.send(`User Authenticated`);
    console.log(request.user);
  }
);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log Out User
 *     responses:
 *       200:
 *         description: Successfully Logged Out
 */
usersRouter.post('/logout', (request, response, next) => {
  request.logout(error => {
    if (error) { return next(error); }
    response.send("Successfully Logged Out")
  })
});

module.exports = usersRouter;
