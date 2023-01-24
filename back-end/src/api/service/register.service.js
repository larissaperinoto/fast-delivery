const { User } = require('../../database/models');

const register = async ({ name, email, password }) => {
  const userRegister = await User.create({
    name,
    email,
    password,
  });

  console.log('userRegister', userRegister.dataValues);

  return null;
}

module.exports = {
  register,
};
