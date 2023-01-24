require('dotenv/config');

const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET || 'mySecret', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  console.log(token);
  return token;
};

module.exports = createToken;
