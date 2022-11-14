require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const usersRouter = require('./routes/users');
const passport = require('passport');

const port = 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

require('./config/passport');

app.use(session({
  secret: process.env.SECRET,
  cookie: {maxAge: 86400000, sameSite: 'strict'},
  saveUninitialized: false,
  resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {res.send('Welcome to the E-Commerce App!')})

// Users Router
app.use('/users', usersRouter);

// Database Error Handler
app.use((error, request, response, next) => {
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
