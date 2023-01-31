const { Router } = require('express');
const authorizationUser = require('../midlewares/validateTokenUser.midleware');

const registerController = require('../controllers/register.controller');

const route = Router();

route.post('/register/seller', authorizationUser, registerController.register);
route.post('/register', registerController.register);
route.get('/users', registerController.getAllUser);

module.exports = route;
