const registerService = require('../service/register.service');

const register = async (req, res) => {
  const { status, message } = await registerService.register(req.body);
  return res.status(status).json({ message });
};

module.exports = {
  register
};
