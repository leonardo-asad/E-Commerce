const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users')
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Welcome to the E-Commerce App!');
})

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`E-commerce app listening port ${port}`);
})
