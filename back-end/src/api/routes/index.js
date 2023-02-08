const { Router } = require('express');

const routeUser = require('./user.routes');
const routeProducts = require('./products.routes');
const routeCustomer = require('./customer.routes');
const routeSeller = require('./seller.routes');

const route = Router();

route.use(routeUser);
route.use(routeProducts);
route.use(routeCustomer);
route.use(routeSeller);

module.exports = route;
