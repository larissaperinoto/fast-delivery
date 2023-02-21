const { Product } = require('../../database/models');
const StatusCode = require('../shared/statusCode');

const findAll = async () => {
  const products = await Product.findAll();
  return { status: StatusCode.OK, message: products };
};

module.exports = {
  findAll,
};
