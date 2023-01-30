const { Router } = require('express');

const registerController = require('../controllers/register.controller');

const route = Router();

route.post('/register', registerController.register);
route.get('/users', registerController.getAllUser);

module.exports = route;
