const loginService = require("../service/login.service");

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, message } = await loginService.login(email, password);
  return res.status(status).json(message);
}

module.exports = {
  login,
};
