const StatusCode = require('../shared/statusCode');

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const regExp = /^\w+@\D+\.\D+$/ ;

  if (name.length < 12) {
    return res.status(StatusCode.BadRequest).json({ message: 'name invalid' });
  }

  const validateEmail = regExp.test(email);

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

module.exports = validateRegister;