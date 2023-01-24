const { Product } = require('../database/models');

console.log(Product);
const findAll = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  findAll,
};
