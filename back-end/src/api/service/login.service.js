const { Op } = require("sequelize");
const md5 = require('md5');

const createToken = require('../utils/jwt');
const StatusCode = require('../shared/statusCode');

const { User } = require('../../database/models');

const login = async (email, password) => {
  const passwordEncript = verificatedPassword(password);

  const user = await User.findOne({
    where: { [Op.and]: [
      { email },
      { password: passwordEncript }
    ]},
  });

  if (!user) {
    return { status: StatusCode.NotFound, message: 'Not found' };
  }

  const { password:_, ...rest } = user.dataValues;

  const token = createToken(rest);

  return { status: StatusCode.OK, message: { ...rest, token: token } };
} 

const verificatedPassword = (password) => {
  const encript = md5(password);
  return encript;
}

module.exports = {
  login,
};