const { Router } = require('express');
const userController = require('../controllers/user.controller');

const route = Router();

route.post('/login', userController.login);

module.exports = route;
