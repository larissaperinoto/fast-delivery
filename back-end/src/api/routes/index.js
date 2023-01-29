const { Router } = require('express');

const routeLogin = require('./login.routes');
const routeProducts = require('./products.routes');
const routeRegister = require('./register.routes');
const routeSales = require('./sales.routes');

const route = Router();

route.use(routeLogin);
route.use(routeProducts);
route.use(routeRegister);
route.use(routeSales);

module.exports = route;
