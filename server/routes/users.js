const usersRouter = require('express').Router();
const userPermissions = require('../permissions/userPermissions');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../db/userQueries');

usersRouter.param('id', db.checkUserId);

usersRouter.get('/', db.getUsers);

usersRouter.get(
  '/checkUserStatus',
  userPermissions.isLoggedIn,
  (request, response) => {
  response.status(200).send(request.user);
});

usersRouter.get('/:id', db.getUserById);

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
    }},
    // Save User in DB
    db.createUser,
    // Authenticate after registration
    passport.authenticate('local'),
    (request, response) => {
      response.status(200).json({
        id: request.user.id,
        username: request.user.username
      });
    }
  );

usersRouter.post('/login',
  passport.authenticate('local'),
  (request, response) => {
    response.status(200).json({
      id: request.user.id,
      username: request.user.username
    });
  }
);

usersRouter.get('/login/google', passport.authenticate('google'));

usersRouter.get('/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: `${process.env.FRONTEND_URL}/#/auth/login`
  })
);

usersRouter.post('/logout', (request, response, next) => {
  request.logout(error => {
    if (error) { return next(error); }
    response.send("Successfully Logged Out")
  })
});

module.exports = usersRouter;
