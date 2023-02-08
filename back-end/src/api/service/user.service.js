const { Op } = require('sequelize');
const md5 = require('md5');

const createToken = require('../utils/jwt');
const statusCode = require('../shared/statusCode');
const { User } = require('../../database/models');


const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email, password: md5(password) },
    attributes: { exclude: ['password'] },
  });

  if (!user) return { status: statusCode.NotFound, message: 'Not found' };

  const token = await createToken({ ...user.dataValues });

  return { status: statusCode.OK, message: { ...user.dataValues, token } };
};

const create = async ({ name, email, password, role }) => {
  const userExists = await User.findOne({ where: { name, email } });

  if (userExists) return { status: statusCode.Conflict, message: 'Conflict' };

  await User.create({ name, email, password: md5(password), role });

  return login({ email, password });
};

const findAll = async () => {
  const users = await User.findAll();
  return { status: statusCode.OK, message: users };
};

const getUserById = async (seller) => {
  const user = await User.findOne({ where: { name: seller } });
  return user;
};

module.exports = {
  login,
  create,
  findAll,
  getUserById,
};