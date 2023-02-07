const { Router } = require('express');

const routeUser = require('./user.routes');
const routeProducts = require('./products.routes');
const routeRegister = require('./register.routes');
const routeCustomer = require('./customer.routes');
const routeSeller = require('./seller.routes');

const route = Router();

route.use(routeUser);
route.use(routeProducts);
route.use(routeRegister);
route.use(routeCustomer);
route.use(routeSeller);

module.exports = route;
