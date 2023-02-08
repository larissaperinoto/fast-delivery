const { Router } = require('express');

const saleController = require('../controllers/sales.controller');
const authorizationUser = require('../midlewares/validateTokenUser.midleware');

const route = Router();

route.use(authorizationUser);
route.get('/sales/:id', saleController.findSaleById);
route.get('/sales/user/:userId', saleController.findAllByUserId)
route.post('/sales', saleController.create);

module.exports = route;
