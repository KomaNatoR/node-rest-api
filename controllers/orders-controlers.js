const marketOrders = require("../services/orders-services");



const getAllOrders = async (_, res) => {
  const data = await marketOrders.getAll();
  res.json(data);
};
const createOrder = async (req, res) => {
  const result = await marketOrders.add(req.body);
  res.status(201).json(result);
};


module.exports = {
  getAllOrders,
  createOrder,
};