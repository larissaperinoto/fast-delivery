const registerService = require('../service/register.service');

const register = async (req, res) => {
  const { status, message } = await registerService.register(req.body);
  return res.status(status).json({ message });
};

const getAllUser = async (_req, res) => {
  const { status, message } = await registerService.getAllUser;
  return res.status(status).json({ message });
};

module.exports = {
  register,
  getAllUser,
};
