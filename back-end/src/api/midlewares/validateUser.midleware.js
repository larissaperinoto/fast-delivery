const StatusCode = require('../shared/statusCode');
const validateLoginFields = require('../utils/validateLoginFields');

const validateLogin = (req, res, next) => {
  const message = validateLoginFields(req.body);
  if (message) return res.status(StatusCode.BadRequest).json({ message });

  next();
};

module.exports = validateLogin;