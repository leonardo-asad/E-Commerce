const usersRouter = require('express').Router();
const db = require('../queries');

usersRouter.get('/', db.getUsers);
usersRouter.get('/:id', db.getUserById);
usersRouter.post('/', db.createUser);

module.exports = usersRouter;
