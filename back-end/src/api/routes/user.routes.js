const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authorizationUser = require('../midlewares/validateTokenUser.midleware');

const route = Router();

route.post('/login', userController.login);
route.post('/users', userController.create);
route.use(authorizationUser);
route.get('/users', userController.findAll);
route.get('/users/:role', userController.findByRole);
route.delete('/users/:id', userController.remove)

module.exports = route;
