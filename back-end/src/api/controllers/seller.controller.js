const sellerService = require('../service/seller.service');

const getSales = async (req, res) => {
  const { status, message } = await sellerService.getAllSalesSeller(req.body);
  return res.status(status).json(message);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await sellerService.getSaleSellerById(id);
  return res.status(status).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await sellerService.updateStatus(id, req.body);
  return res.status(status).json(message);
};

module.exports = {
  getSales,
  getSalesId,
  updateSale,
};