const axios = require("axios");

const setAuthReq = () => {
  const token = localStorage.getItem("tokenSeolow");
  if (token) {
    if (!axios.defaults.headers.common["Authorization"])
      axios.defaults.headers.common["Authorization"] = "JWT " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthReq;
