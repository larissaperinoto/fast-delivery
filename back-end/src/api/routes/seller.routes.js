const { Router } = require('express');

const sallerController = require('../controllers/seller.controller');
const authorizationUser = require('../midlewares/validateTokenUser.midleware');

const route = Router();

route.get('/seller/orders/:id', sallerController.getSales);

module.exports = route;
