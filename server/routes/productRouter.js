const productRouter = require("express").Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  clearData,
} = require("../controllers/product.controller");
const { bodyRequired, adminRequired } = require("../controllers/reqRequired");

productRouter.route("/create").post(adminRequired, bodyRequired, createProduct);
productRouter.route("/pushingdata").post(bodyRequired, createProduct);
productRouter.route("/").get(getProducts);
productRouter.route("/getproduct").post(bodyRequired, getProduct);
productRouter.route("/update").post(adminRequired, bodyRequired, updateProduct);
productRouter
  .route("/delete")
  .delete(adminRequired, bodyRequired, deleteProduct);
productRouter.route("/cleardata").delete(clearData);

module.exports = productRouter;
