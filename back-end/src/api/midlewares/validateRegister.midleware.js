/* const StatusCode = require('../shared/statusCode');

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const regExp = /^\w+@\D+\.\D+$/;
  const regExp2 = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  if (name && name.length < 12) {
    return res.status(StatusCode.BadRequest).json({ message: 'name invalid' });
  }

  const validateEmail = regExp.test(email) || regExp2.test(email);

  if (!validateEmail) {
    return res.status(StatusCode.BadRequest)
      .json({ message: 'O email deve ter o formato "email@email.com"' });
  }

  if (password.length < 6) {
    return res.status(StatusCode.BadRequest)
      .json({ message: 'password is need six characteres' });
  }

  next();
}; */

const validateRegisterFields = require('../utils/validateRegisterFields');
const StatusCode = require('../shared/statusCode');

const validateRegister = (req, res, next) => {
  const message = validateRegisterFields(req.body);
  if (message) return res.status(StatusCode.BadRequest).json({ message });

  next();
};

module.exports = validateRegister;