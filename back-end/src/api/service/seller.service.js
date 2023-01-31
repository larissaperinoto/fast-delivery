const { Sale, Product, User } = require('../../database/models');
const StatusCode = require('../shared/statusCode');

const getAllSalesSeller = async (seller) => {
  const { id } = seller.user;
  const sales = await Sale.findAll({ where: { sellerId: id } });
  return { status: StatusCode.OK, message: sales };
};

const getSaleSellerId = async (id) => {
  const sales = await Sale.findAll({
    where: { id },
    include: [
      { model: Product,
        as: 'sales_products',
        attributes: { exclude: ['urlImage'] } },
    ],
  });
  return { status: StatusCode.OK, message: sales };
};

const getAllSellers = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
  });
  return { status: StatusCode.OK, message: sellers };
};

module.exports = {
  getAllSalesSeller,
  getSaleSellerId,
  getAllSellers,
};
