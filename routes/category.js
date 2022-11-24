const categoryRouter = require('express').Router();
const db = require('../db/categoryQueries');

categoryRouter.get('/', db.getAllCategories);

module.exports = categoryRouter;
