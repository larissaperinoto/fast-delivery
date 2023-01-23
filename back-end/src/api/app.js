const express = require('express');
const productsRoutes = require('../routes/products.routes');

const app = express();

app.use('/products', productsRoutes);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
