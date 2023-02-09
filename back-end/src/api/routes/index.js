const { Router } = require('express');

const routeUser = require('./user.routes');
const routeProducts = require('./products.routes');
const routeSales = require('./sales.routes');

const route = Router();

route.use(routeUser);
route.use(routeProducts);
route.use(routeSales);

module.exports = route;
