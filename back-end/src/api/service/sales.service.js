const { Sale, Product, User } = require('../../database/models');
const StatusCode = require('../shared/statusCode');
const salesProductsService = require('./sales.products.service');

const updateStatus = async (id, { status }) => {
  await Sale.update({ status }, {
    where: { id },
  });

  return { status: StatusCode.OK, message: 'Updated' };
};


const findSaleById = async ({ id }) => {
  const sale = await Sale.findOne({
    where: { id },
    include: [
      { model: Product,
        as: 'products',
        attributes: { exclude: ['urlImage'] } },
      { model: User, as: 'sellerInfos'},
    ],
  });

  if (!sale) {
    return { status: StatusCode.NotFound, message: 'Not found' };
  }

  return { status: StatusCode.OK, message: sale.dataValues };
};


const create = async ({ seller, totalPrice, deliveryAddress, deliveryNumber, user: { id }, products}) => {
  const saleRegistered = await Sale.create({
      userId: id,
      sellerId: seller,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
      saleDate: new Date().toISOString(),
  });

  await salesProductsService.create({ products, saleId: saleRegistered.id });

  return { status: StatusCode.Create, message: saleRegistered };
};

const findByCustomerId = async (userId) => {
  const sales = await Sale.findAll({
    where: { userId },
    include: [
      { model: Product,
        as: 'products',
        attributes: { exclude: ['urlImage'] } },
      ],
    });

  return sales;
}

const findBySellerId = async (sellerId) => {
  const sales = await Sale.findAll({
  where: { sellerId },
  include: [
    { model: Product,
      as: 'products',
      attributes: { exclude: ['urlImage'] } },
    ],
  });

  return sales;
};

const findSalesByUserId = async ({ id, role }) => {
  let sales = [];
  if (role === "customer") {
    sales = await findByCustomerId(id);
  } else {
    sales = await findBySellerId(id);
  }

  if (!sales) {
    return { status: StatusCode.NotFound, message: 'Not found' };
  }

  return { status: StatusCode.OK, message: sales };
};

module.exports = {
  updateStatus,
  findSaleById,
  findSalesByUserId,
  create,
};
