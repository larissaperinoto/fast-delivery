const customerService = require('../service/customer.service');
const statusCode = require('../shared/statusCode');

const create = async (req, res) => {
  const result = await customerService.createSale(req.body);
  return res.status(statusCode.Create).json(result);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const result = await customerService.getSales(id);
  return res.status(statusCode.OK).json(result);
};

const getSalesByCustomerId = async (req, res) => {
  const result = await customerService.getSalesByCustomerId(req.body.user.id);
  return res.status(statusCode.OK).json(result);
};

module.exports = {
  create,
  getSale,
  getSalesByCustomerId,
};
