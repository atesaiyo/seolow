import setAuthReq from "./setAuthReq";
const axios = require("axios");

const register = (data) => {
  return axios
    .post("/api/user/register", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const signIn = (data) => {
  return axios
    .post("/api/user/signin", data)
    .then((res) => {
      localStorage.setItem("tokenSeolow", res.data.token);
      localStorage.setItem("cart", JSON.stringify(res.data.cart));
      setAuthReq();
      return res.data;
    })
    .catch((err) => err.response.data);
};

const getUser = (data) => {
  setAuthReq();
  return axios
    .post("/api/user/getuser", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const signOut = () => {
  localStorage.setItem("tokenSeolow", "");
  localStorage.setItem("cart", "[]");
  setAuthReq();
};

const updateUser = (data) => {
  setAuthReq();
  return axios
    .post("/api/user/update", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const updateCart = (data) => {
  setAuthReq();
  return axios
    .post("/api/user/updatecart", data)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const forgetPassword = (data) => {
  return axios
    .post("/api/user/forgetpwd", data)
    .then((res) => {
      localStorage.setItem("tokenSeolow", res.data.token);
      localStorage.setItem("cart", JSON.stringify(res.data.cart));
      setAuthReq();
      return res.data;
    })
    .catch((err) => err.response.data);
};

const deleteUser = (data) => {
  setAuthReq();
  return axios
    .delete("/api/user/delete", { data: data })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export {
  register,
  signIn,
  getUser,
  signOut,
  updateUser,
  updateCart,
  forgetPassword,
  deleteUser,
};
