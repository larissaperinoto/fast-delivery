const { Router } = require('express');

const registerController = require('../controllers/register.controller');

const route = Router();

route.get('/name/:id', registerController.getUserOrSellerName);

module.exports = route;
