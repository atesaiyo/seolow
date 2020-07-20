const Product = require("../models/product.model");
const fs = require("fs");
const { NODE_ENV } = require("../config");

let imageConfig = { imageSrc: `/images/products/`, backwardFolders: 2 };
if (NODE_ENV === "production")
  imageConfig.imagePath = `/client/build/images/products/`;
else imageConfig.imagePath = `/client/public/images/products/`;

const imageDir = (name) => {
  let dir = __dirname;
  const pattern = /\\[a-z]*$/;
  for (let i = 0; i < imageConfig.backwardFolders; i++) {
    dir = dir.slice(0, dir.length - dir.match(pattern)[0].length);
  }
  return dir.split("\\").join("/") + imageConfig.imagePath + name;
};
const deleteImage = (name) => {
  fs.unlink(imageDir(name), (err) => {
    if (err) console.log("No images");
  });
};
const getImageName = (path) => path.split("/").pop();

const createProduct = (req, res) => {
  const newProduct = new Product(req.body);
  if (req.files) {
    const images = req.files.images;
    if (!fs.existsSync(imageDir(images.name))) {
      images.mv(imageDir(images.name));
      newProduct.images = [
        { src: imageConfig.imageSrc + images.name, alt: "product-image" },
      ];
    }
  } else if (req.body.imagesLink) {
    newProduct.images = [
      { src: req.body.imagesLink, alt: "product-image-link" },
    ];
  }
  newProduct
    .save()
    .then((product) => res.json({ product: product }))
    .catch((err) => {
      res.status(500).json({ message: "Failed to create product!!!" });
      throw err;
    });
};

const getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      if (products) return res.json({ products: products });
      else return res.status(404).json({ message: "No products found!!!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get products!!!" });
      throw err;
    });
};

const getProduct = (req, res) => {
  const _id = req.body._id;
  Product.findOne({ _id: _id })
    .then((product) => {
      if (product) return res.json({ product: product });
      return res.status(404).json({ message: "Product not found!!!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed find product!!!" });
      throw err;
    });
};

const updateProduct = (req, res) => {
  const productUpdate = req.body;
  Product.findOne({ _id: productUpdate._id })
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not found!!!" });
      if (req.files) {
        const images = req.files.images;
        if (
          product.images[0].src &&
          product.images[0].alt === "product-image"
        ) {
          const oldImagesName = getImageName(product.images[0].src);
          if (fs.existsSync(imageDir(oldImagesName)))
            deleteImage(oldImagesName);
        }
        images.mv(imageDir(images.name));
        productUpdate.images = [
          { src: imageConfig.imageSrc + images.name, alt: "product-image" },
        ];
      }
      Product.updateOne({ _id: product._id }, { $set: productUpdate })
        .exec()
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(500).json({ message: "Failed to update product!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update product!!!" });
      throw err;
    });
};

const deleteProduct = (req, res) => {
  const _id = req.body._id;
  Product.findOne({ _id: _id })
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not found!!!" });
      const imagesName = getImageName(product.images[0].src);
      if (fs.existsSync(imageDir(imagesName))) deleteImage(imagesName);
      Product.deleteOne({ _id: _id })
        .exec()
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(500).json({ message: "Failed to delete product!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete product!!!" });
      throw err;
    });
};

const clearData = (req, res) => {
  Product.find().then((products) => {
    products.forEach((product) => Product.deleteOne({ _id: product._id }));
    res.json({
      message: "remove " + products.length + " products",
      products: products,
    });
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  clearData,
};
