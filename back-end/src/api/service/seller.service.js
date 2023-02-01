const { Sale, Product, User } = require('../../database/models');
const StatusCode = require('../shared/statusCode');

const getAllSalesSeller = async (seller) => {
  const { id } = seller.user;
  const sales = await Sale.findAll({ where: { sellerId: id } });
  return { status: StatusCode.OK, message: sales };
};

const getSaleSellerById = async (id) => {
  const sales = await Sale.findOne({
    where: { id },
    include: [
      { model: Product,
        as: 'sales_products',
        attributes: { exclude: ['urlImage'] } },
      { model: User,
        as: 'sellerInfos' },
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

const updateStatus = async (id, { status }) => {
  await Sale.update({ status }, {
    where: { id },
  });

  return { status: StatusCode.OK, message: 'Updated' };
};

module.exports = {
  getAllSalesSeller,
  getAllSellers,
  updateStatus,
  getSaleSellerById,
};
