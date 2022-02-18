const express = require('express');

require('./config/db')();
const {
  notFoundHandler,
  genericErrorHandler,
} = require('./middlewares/http-error-handlers');
const carRoutes = require('./routes/cars');

const app = express();

app.use('/cars', carRoutes);

app.use(notFoundHandler);
app.use(genericErrorHandler);

module.exports = app;
