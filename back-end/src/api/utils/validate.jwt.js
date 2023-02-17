require('dotenv/config');

const jwt = require('jsonwebtoken');
const fs = require('fs');

const validadeToken = (token) => {
  try {
    const key = fs.readFileSync('./jwt.evaluation.key');
    const userInfos = jwt.verify(token, key);
    return { type: null, message: userInfos };
  } catch (error) {
    return { type: 'TOKEN NVALID', message: error };
  }
};

module.exports = validadeToken;
