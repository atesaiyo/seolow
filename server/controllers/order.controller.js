const Order = require("../models/order.model");
const User = require("../models/user.model");

const createOrder = (req, res) => {
  const newOrder = new Order(req.body);
  User.findOne({ username: newOrder.username }).then((user) => {
    newOrder.name = user.name;
    newOrder
      .save()
      .then((order) => res.json({ order: order }))
      .catch((err) => {
        res.status(500).json({ message: "Failed to create order!!!" });
        throw err;
      });
  });
};

const getOrders = (req, res) => {
  Order.find()
    .then((orders) => res.json({ orders: orders }))
    .catch((err) => {
      res.status(500).json({ message: "Failed to get orders!!!" });
      throw err;
    });
};

const getOrder = (req, res) => {
  const _id = req.body._id;
  Order.findOne({ _id: _id })
    .then((order) => {
      if (!order) return res.status(404).json({ message: "No order found!!!" });
      res.json({ order: order });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to find order!!!" });
      throw err;
    });
};

const getUserOrders = (req, res) => {
  const username = req.body.username;
  Order.find({ username: username })
    .then((userOrders) => {
      if (!userOrders)
        return res.status(404).json({ message: "No order found!!!" });
      res.json({ userOrders: userOrders });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to find order list!!!" });
      throw err;
    });
};

const updateOrder = (req, res) => {
  const updateOrder = req.body;
  Order.findOne({ _id: updateOrder._id })
    .then((order) => {
      if (!order)
        return res.status(404).json({ message: "Order not found!!!" });
      Order.updateOne({ _id: updateOrder._id }, { $set: updateOrder })
        .exec()
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(500).json({ message: "Failed to update order!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update order!!!" });
      throw err;
    });
};

const deleteOrder = (req, res) => {
  const _id = req.body._id;
  Order.findOne({ _id: _id })
    .then((order) => {
      if (!order)
        return res.status(404).json({ message: "Order not found!!!" });
      Order.deleteOne({ _id: _id })
        .exec()
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(500).json({ message: "Failed to delete order!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete order!!!" });
      throw err;
    });
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  getUserOrders,
  updateOrder,
  deleteOrder,
};
