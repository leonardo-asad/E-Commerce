const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../queries/userQueries');

usersRouter.param('id', db.checkUserId);

usersRouter.get('/', db.getUsers);

usersRouter.get('/:id', db.getUserById);

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

usersRouter.post('/login',
  passport.authenticate('local'),
  (request, response) => {
    console.log(request.user);
    response.send(`User Authenticated`);
  }
);

usersRouter.put('/:id', db.updateUser);

usersRouter.delete('/:id', db.deleteUser);

module.exports = usersRouter;
