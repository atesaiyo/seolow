import setAuthReq from "./setAuthReq";
const axios = require("axios");

const createProduct = (data) => {
  setAuthReq();
  return axios
    .post("/api/product/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getProducts = () => {
  return axios
    .get("/api/product")
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getProduct = (data) => {
  return axios
    .post("/api/product/getproduct", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const updateProduct = (data) => {
  setAuthReq();
  return axios
    .post("/api/product/update", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const deleteProduct = (data) => {
  setAuthReq();
  return axios
    .delete("/api/product/delete", { data: data })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
