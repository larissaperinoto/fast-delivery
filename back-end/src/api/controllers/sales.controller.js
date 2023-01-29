const saleService = require('../service/sales.service');
const statusCode = require('../shared/statusCode');

const create = async (req, res) => {
  const result = await saleService.createSale(req.body);
  return res.status(statusCode.Create).json(result);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await saleService.getSales(id);
  return res.status(statusCode.OK).json(result);
};

module.exports = {
  create,
  getSale,
};
