const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
  res.send('Hello world!');
})

app.listen(port, () => {
  console.log(`E-commerce app listening port ${port}`);
})
