const { Router } = require('express');

const routeLogin = require('./login.route');

const route = Router();

route.use(routeLogin);

module.exports = route;
