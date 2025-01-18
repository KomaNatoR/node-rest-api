const express = require("express");

const ctrl = require("../controllers/orders-controlers");



const orderRouter = express.Router();
orderRouter.get("/", ctrl.getAllOrders);
orderRouter.post("/", ctrl.createOrder);


module.exports = orderRouter;