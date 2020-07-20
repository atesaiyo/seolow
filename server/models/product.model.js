const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  prices: { type: Number, required: true },
  available: { type: Boolean, default: true },
  details: { type: String, required: true },
  collected: { type: String, default: "other" },
  images: { type: Array, default: [{ src: "", alt: "image" }] },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
