const { Router } = require('express');

const routeLogin = require('./login.routes');
const routeProducts = require('./products.routes');

const route = Router();

route.use(routeLogin);
route.use(routeProducts);

module.exports = route;
