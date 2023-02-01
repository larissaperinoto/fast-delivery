const moment = require('moment');

const { Sale, SalesProduct, Product } = require('../../database/models');
const StatusCode = require('../shared/statusCode');
// const userService = require('./register.service');

moment.locale('pt-br');

const salveSalesProduct = async ({ products }, saleId) => {
  const arrBulk = products.map(({ productId, quantity }) =>
    ({ saleId, productId, quantity }));

  await SalesProduct.bulkCreate(arrBulk);
};

const createSale = async (sale) => {
  const { user: { id } } = sale;
  const { seller, totalPrice, deliveryAddress, deliveryNumber } = sale;

  // const idSeller = await userService.userSellerId(seller);
  const DataAtual = moment().format('L');

  const saleRegister = await Sale.create({
      userId: id,
      sellerId: seller,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
      saleDate: DataAtual,
  });

  const idSaleRegister = saleRegister.id;

  await salveSalesProduct(sale, idSaleRegister);

  return saleRegister;
};

const getSales = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: [
      { model: Product,
        as: 'sales_products',
        attributes: { exclude: ['urlImage'] } },
    ],
  });

  if (!sale) {
    return { status: StatusCode.NotFound, message: 'Not found' };
  }

  return sale;
};

const getSalesByCustomerId = async (id) => {
  const sale = await Sale.findAll({
    where: { userId: id },
    include: [
      { model: Product,
        as: 'sales_products',
        attributes: { exclude: ['urlImage'] } },
    ],
  });

  return sale;
};

module.exports = {
  createSale,
  getSales,
  getSalesByCustomerId,
};