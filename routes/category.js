const categoryRouter = require('express').Router();
const db = require('../queries/categoryQueries');

categoryRouter.get('/', db.getAllCategories);

module.exports = categoryRouter;
