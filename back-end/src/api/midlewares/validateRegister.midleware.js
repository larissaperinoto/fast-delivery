const validateRegisterFields = require('../utils/validateRegisterFields');
const StatusCode = require('../shared/statusCode');

const validateRegister = (req, res, next) => {
  const message = validateRegisterFields(req.body);
  if (message) return res.status(StatusCode.BadRequest).json({ message });

  next();
};

module.exports = validateRegister;