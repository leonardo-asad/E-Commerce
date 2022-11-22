require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
var swaggerJSDoc = require('swagger-jsdoc');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()

const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');

const port = 3000;

const app = express();

app.use(express.static(pathToSwaggerUi));

// swagger definition
var swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'E-commerce application REST API that allows users to perform various CRUD operations such as registering an account, browsing products for sale, etc.'
    },
    host: `localhost:${port}`,
    schemes: ['http'],
    basePath: '/',
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid'
      }
    },
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

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

app.get('/', (req, res) => {
  if (req.user) {
    res.send(`Welcome ${req.user.username}!`)
  } else {
    res.send('Welcome to the E-Commerce App!')
  }
});

app.get('/swagger.json', (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(swaggerSpec);
});

// Users Router
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

// Database Error Handler
app.use((error, request, response, next) => {
  //console.log(error)
  if (error.code === "23505") {
    if (error.constraint === "unique_username") {
      response.status(400).send("The username already exists");
    } else if (error.constraint === "unique_name") {
      response.status(400).send("The name of the publishing already exists. Please choose other.");
    } else if (error.constraint === "cart_user_id_key") {
      response.status(400).send("The user can not have more than one cart");
    } else {
      response.status(400).send("Duplicate value violates unique constraint");
    }
  } else {
    return next(error);
  }
})

app.listen(port, () => {
  console.log(`E-commerce app listening port ${port}`);
})
