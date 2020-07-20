const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const date = new Date();
let hourTime =
  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
let dayTime = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

const OrderSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  info: {
    type: Object,
    default: {
      status: "Created",
      dateCreated: hourTime + " " + dayTime,
      dateConfirmed: "",
      dateSended: "",
      dateCompleted: "",
      dateCancelled: "",
    },
  },
  listItems: { type: Array, default: [] },
  costs: { type: Number, default: 0 },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
