const userService = require('../service/user.service');

const login = async (req, res) => {
  const { status, message } = await userService.login(req.body);
  return res.status(status).json(message);
};

const create = async (req, res) => {
  const { status, message } = await userService.create(req.body);
  return res.status(status).json(message);
};

const findAll = async (_req, res) => {
  const { status, message } = await userService.findAll();
  return res.status(status).json(message);
};

const findByRole = async (req, res) => {
  const { status, message } = await userService.findByRole(req.params);
  return res.status(status).json(message);
};

module.exports = {
  login,
  create,
  findAll,
  findByRole,
};
