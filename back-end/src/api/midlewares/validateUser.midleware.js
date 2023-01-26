const StatusCode = require('../shared/statusCode');

const regExp = /^\w+@\D+\.\D+$/;
const regExp2 = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(StatusCode.BadRequest).json({ message: 'email is required' });
  }

  if (!password) {
    return res.status(StatusCode.BadRequest).json({ message: 'password is required' });
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
};

module.exports = validateLogin;
