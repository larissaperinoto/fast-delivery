const { Router } = require('express');

const routeLogin = require('./login.routes');
const routeProducts = require('./products.routes');
const routeRegister = require('./register.routes');
const routeCustomer = require('./customer.routes');
const routeSeller = require('./seller.routes');

const route = Router();

route.use(routeLogin);
route.use(routeProducts);
route.use(routeRegister);
route.use(routeCustomer);
route.use(routeSeller);

module.exports = route;
