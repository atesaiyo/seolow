const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  admin: { type: Boolean, default: false },
  cart: { type: Array, default: [] },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
