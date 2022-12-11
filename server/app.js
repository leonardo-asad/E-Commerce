require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');

const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const categoryRouter = require('./routes/category');

const port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
//app.use(cors());
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

const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, 'swagger.yml'), 'utf8'));

// Serves Swagger API documentation to /docs url
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api', (req, res) => {
  if (req.user) {
    res.send(`Welcome ${req.user.username}!`)
  } else {
    res.send('Welcome to the E-Commerce App!')
  }
});

// Users Router
app.use('/api/users', usersRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);

// Database Error Handler
app.use((error, request, response, next) => {
  //console.log(error)
  if (error.code === "23505") {
    if (error.constraint === "unique_username") {
      response.status(400).send("The username already exists");
    } else if (error.constraint === "unique_name") {
      response.status(400).send("The name of the product already exists. Please choose other.");
    } else if (error.constraint === "cart_user_id_key") {
      response.status(400).send("Users can not have more than one cart");
    } else {
      response.status(400).send("Duplicate value violates unique constraint");
    }
  } else {
    return next(error);
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`E-commerce app listening port ${port}`);
})
