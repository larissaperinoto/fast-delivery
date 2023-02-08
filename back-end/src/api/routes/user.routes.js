const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authorizationUser = require('../midlewares/validateTokenUser.midleware');

const route = Router();

route.post('/login', userController.login);
route.post('/users', userController.create);
route.get('/users', authorizationUser, userController.findAll);

module.exports = route;
