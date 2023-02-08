const express = require('express');
const cors = require('cors');

const route = require('./routes');

const app = express();

app.use(express.json());

app.use(express.static('public'));
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(route);

module.exports = app;
