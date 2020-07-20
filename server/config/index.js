require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_LIFETIME_SECONDS: process.env.JWT_LIFETIME_SECONDS || 86400,
  NODE_ENV: process.env.NODE_ENV,
};
