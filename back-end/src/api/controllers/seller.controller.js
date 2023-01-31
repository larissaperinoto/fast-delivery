const sellerService = require('../service/seller.service');

const getSales = async (req, res) => {
  const { status, message } = await sellerService.getAllSalesSeller(req.body);
  return res.status(status).json(message);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await sellerService.getSaleSellerId(id);
  return res.status(status).json(message);
};

const getAllSellers = async (req, res) => {
  const { status, message } = await sellerService.getAllSellers();
  return res.status(status).json(message);
};

module.exports = {
  getSales,
  getSalesId,
  getAllSellers,
};