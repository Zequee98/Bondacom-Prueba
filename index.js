const express = require('express');
const axios = require('axios');

const route = require('./routes');
const app = express();

app.use('/', route);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, () => console.log('Escuchando en puerto 3000'));
