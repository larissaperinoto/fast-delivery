const productsService = require('../services/products.services');

const findAll = async (req, res) => {
  const products = await productsService.findAll();
  return res.status(200).json(products);
};

module.exports = {
  findAll,
};
