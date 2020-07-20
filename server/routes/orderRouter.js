const orderRouter = require("express").Router();
const {
  createOrder,
  getOrders,
  getOrder,
  getUserOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const { bodyRequired, adminRequired, userRequired } = require("../controllers/reqRequired");

orderRouter.route("/create").post(userRequired, createOrder);
orderRouter.route("/").get(adminRequired, getOrders);
orderRouter.route("/getorder").post(userRequired, getOrder);
orderRouter.route("/getuserorders").post(userRequired, getUserOrders);
orderRouter.route("/update").post(userRequired, updateOrder);
orderRouter.route("/delete").delete(adminRequired, bodyRequired, deleteOrder);

module.exports = orderRouter;
