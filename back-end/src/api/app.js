const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('../../swagger.json');
const cors = require('cors');

const route = require('./routes');

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use(express.static('public'));
const corsOptions = {
  origin: ['https://previous-brass-production.up.railway.app', 'http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(route);

module.exports = app;
