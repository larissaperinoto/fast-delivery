const salesService = require('../service/sales.service');

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.updateStatus(id, req.body);
  return res.status(status).json(message);
};

const findSaleById = async (req, res) => {
  const  { status, message } = await salesService.findSaleById(req.params);
  return res.status(status).json(message);
}

const create = async (req, res) => {
  const { status, message } = await salesService.create(req.body);
  return res.status(status).json(message);
};

const findAllByUserId = async (req, res) => {
  const { status, message } = await salesService.findAllByUserId(req.params);
  return res.status(status).json(message);
};

const findAllBySellerId = async (req, res) => {
  const { status, message } = await salesService.findAllBySellerId(req.params);
  return res.status(status).json(message);
};

module.exports = {
  updateSale,
  findSaleById,
  create,
  findAllByUserId,
  findAllBySellerId,
};