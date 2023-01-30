const { Sale, Product } = require('../../database/models');
const StatusCode = require('../shared/statusCode');

const getAllSalesSeller = async (id) => {
  const sales = await Sale.findAll({
    where: { sellerId: id },
  });
  return { status: StatusCode.OK, message: sales };
};

module.exports = {
  getAllSalesSeller,
}