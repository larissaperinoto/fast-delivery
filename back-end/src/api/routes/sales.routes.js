const { Router } = require('express');

const saleController = require('../controllers/sales.controller');
const authorizationUser = require('../midlewares/validateTokenUser.midleware');

const route = Router();

route.post('/customer/orders', authorizationUser, saleController.create);
route.get('/customer/orders/:id', authorizationUser, saleController.getSale);

module.exports = route;
