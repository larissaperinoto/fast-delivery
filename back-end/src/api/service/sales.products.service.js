const { SalesProduct } = require('../../database/models');

const create = async ({ products, saleId }) => {
  const arrBulk = products.map(({ productId, quantity }) =>
    ({ saleId, productId, quantity }));

  await SalesProduct.bulkCreate(arrBulk);
};

module.exports = { create };
