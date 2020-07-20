import setAuthReq from "./setAuthReq";
const axios = require("axios");

const createOrder = (data) => {
  setAuthReq();
  return axios
    .post("/api/order/create", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getOrders = () => {
  setAuthReq();
  return axios
    .get("/api/order")
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getOrder = (data) => {
  setAuthReq();
  return axios
    .post("/api/order/getorder", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getUserOrders = (data) => {
  setAuthReq();
  return axios
    .post("/api/order/getuserorders", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const updateOrder = (data) => {
  setAuthReq();
  return axios
    .post("/api/order/update", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const deleteOrder = (data) => {
  setAuthReq();
  return axios
    .delete("/api/order/delete", { data: data })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export {
  createOrder,
  getOrders,
  getOrder,
  getUserOrders,
  updateOrder,
  deleteOrder,
};
