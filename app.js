const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const usersRouter = require('./routes/users')

const port = 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Welcome to the E-Commerce App!');
})

// Users Router
app.use('/users', usersRouter);

// Database Error Handler
app.use((error, request, response, next) => {
  console.log(error.prototype.cause)
  if (error.code === "23505") {
    if (error.constraint === "unique_username") {
      response.status(400).send("The username already exists");
    }
  } else {
    return next(error);
  }
})

app.listen(port, () => {
  console.log(`E-commerce app listening port ${port}`);
})
