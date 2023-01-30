const sellerService = require('../service/seller.service');

const getSales = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await sellerService.getAllSalesSeller(id);
  return res.status(status).json(message);
};

module.exports = {
  getSales,
};