const express = require('express');
const productsRoutes = require('../routes/products.routes');
const route = require('./routes');

const app = express();
app.use(express.json());

app.use('/products', productsRoutes);
app.use(route);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
