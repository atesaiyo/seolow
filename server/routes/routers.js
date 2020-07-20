const routers = require("express").Router();

const userRouter = require("./userRouter");
routers.use("/user", userRouter);

const productRouter = require("./productRouter");
routers.use("/product", productRouter);

const ordersRouter = require("./orderRouter");
routers.use("/order", ordersRouter);

module.exports = routers;
