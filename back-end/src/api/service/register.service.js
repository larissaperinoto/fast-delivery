const { Op } = require('sequelize');
const md5 = require('md5');

const { User } = require('../../database/models');
const statusCode = require('../shared/statusCode');

const verificatedUser = async (name, email) => {
  const userVerificated = await User.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
    },
  });

  return userVerificated;
};

const register = async ({ name, email, password, role }) => {
  const verificated = await verificatedUser(name, email);

  if (verificated) {
    return { status: statusCode.Conflit, message: 'Conflict' };
  }

  await User.create({ name, email, password: md5(password), role });

  return { status: statusCode.Create, message: 'Created' };
};

module.exports = {
  register,
};
