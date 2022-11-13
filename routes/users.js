const usersRouter = require('express').Router();
const db = require('../queries');

usersRouter.param('id', db.checkUserId);

usersRouter.get('/', db.getUsers);
usersRouter.get('/:id', db.getUserById);
usersRouter.post('/', db.createUser);
usersRouter.put('/:id', db.updateUser);
usersRouter.delete('/:id', db.deleteUser);

module.exports = usersRouter;
