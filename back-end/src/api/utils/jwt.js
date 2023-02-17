require('dotenv/config');

const jwt = require('jsonwebtoken');
const fs = require('fs');

const createToken = async ({ id, name, email, role }) => {
  const key = fs.readFileSync('./jwt.evaluation.key');
  const token = jwt.sign({ id, name, email, role }, key, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

module.exports = createToken;
