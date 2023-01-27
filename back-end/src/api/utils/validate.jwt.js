require('dotenv/config');

const jwt = require('jsonwebtoken');
const fs = require('fs');

const validadeToken = (token) => {
  try {
    const key = fs.readFileSync('./jwt.evaluation.key');
    const { data } = jwt.verify(token, key);
    console.log('data', data);
    return { type: null, message: data };
  } catch (error) {
    return { type: 'TOKEN NVALID', message: error };
  }
};

module.exports = validadeToken;
