const { Router } = require('express');

const saleController = require('../controllers/sales.controller');
const authorizationUser = require('../midlewares/validateTokenUser.midleware');

const route = Router();

route.use(authorizationUser);
route.get('/sales/:id', saleController.findSaleById);
route.get('/sales/customer/:userId', saleController.findAllByUserId);
route.get('/sales/seller/:sellerId', saleController.findAllBySellerId);
route.post('/sales', saleController.create);
route.put('/sales/:id', saleController.updateSale)

module.exports = route;
