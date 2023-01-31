const { Sale, Product } = require('../../database/models');
const StatusCode = require('../shared/statusCode');

const getAllSalesSeller = async (seller) => {
  const { id } = seller.user;
  const sales = await Sale.findAll({ where: { sellerId: id } });
  return { status: StatusCode.OK, message: sales };
};

const getSaleSellerById = async (id) => {
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

const updateStatus = async (id, { status }) => {
  await Sale.update({ status }, {
    where: { id },
  });
  
  return { status: StatusCode.OK, message: 'Updated' };
};

module.exports = {
  getAllSalesSeller,
  getSaleSellerById,
  updateStatus,
};
