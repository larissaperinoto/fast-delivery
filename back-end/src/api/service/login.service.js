const { Op } = require('sequelize');
const md5 = require('md5');

const createToken = require('../utils/jwt');
const StatusCode = require('../shared/statusCode');
const { User } = require('../../database/models');

const verificatedPassword = (password) => {
  const encript = md5(password);
  return encript;
};

const modelViewUser = (user) => {
  const { id, name, email, role } = user.dataValues;

  const token = createToken({ id, name, email, role });

  const modelView = { id, name, email, role, token };

  return modelView;
};

const login = async (email, password) => {
  const passwordEncript = verificatedPassword(password);
  console.log(passwordEncript);

  const user = await User.findOne({
    where: { [Op.and]: [
      { email },
      { password: passwordEncript },
     ],
    },
  });

  if (!user) {
    return { status: StatusCode.NotFound, message: 'Not found' };
  }

  const result = modelViewUser(user);

  return { status: StatusCode.OK, message: result };
};

module.exports = {
  login,
};