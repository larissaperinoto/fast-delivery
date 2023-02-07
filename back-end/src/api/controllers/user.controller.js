const userService = require('../service/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, message } = await userService.login(email, password);
  return res.status(status).json(message);
};

module.exports = {
  login,
};
