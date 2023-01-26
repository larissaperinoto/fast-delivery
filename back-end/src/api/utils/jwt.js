require('dotenv/config');

const jwt = require('jsonwebtoken');
const fs = require('fs');

const createToken = (data) => {
  const key = fs.readFileSync('./jwt.evaluation.key');
  const token = jwt.sign({ data }, key, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

module.exports = createToken;
