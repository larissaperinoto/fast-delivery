const productsService = require('../service/products.service');

const findAll = async (req, res) => {
  const { status, message } = await productsService.findAll();
  return res.status(status).json(message);
};

module.exports = {
  findAll,
};
