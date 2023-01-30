const { Router } = require('express');

const loginController = require('../controllers/login.controller');

const route = Router();

route.post('/login', loginController.login);

module.exports = route;
