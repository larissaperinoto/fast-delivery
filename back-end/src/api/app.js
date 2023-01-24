const express = require('express');
const cors = require('cors');

const route = require('./routes');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(route);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
