const { Router } = require('express');

const routeLogin = require('./login.routes');
const routeProducts = require('./products.routes');
const routeRegister = require('./register.routes');

const route = Router();

route.use(routeLogin);
route.use(routeProducts);
route.use(routeRegister);

module.exports = route;
