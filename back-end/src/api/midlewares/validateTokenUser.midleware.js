const validadeToken = require('../utils/validate.jwt');

const authorizationUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const { type, message } = validadeToken(authorization);

  if (type) {
    return res.status(401).json({ message: 'Token invalid' });
  }
  req.body.user = message;

  next();
};

module.exports = authorizationUser;
