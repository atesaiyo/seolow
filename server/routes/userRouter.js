const userRouter = require("express").Router();
const {
  register,
  signIn,
  getUser,
  updateUser,
  updateCart,
  forgetPassword,
  deleteUser,
  clearUser,
} = require("../controllers/user.controller");
const { bodyRequired, loginRequired } = require("../controllers/reqRequired");

userRouter.route("/register").post(bodyRequired, register);
userRouter.route("/signin").post(bodyRequired, signIn);
userRouter.route("/getuser").post(loginRequired, bodyRequired, getUser);
userRouter.route("/update").post(loginRequired, bodyRequired, updateUser);
userRouter.route("/updatecart").post(loginRequired, bodyRequired, updateCart);
userRouter.route("/forgetpwd").post(bodyRequired, forgetPassword);
userRouter.route("/delete").delete(loginRequired, bodyRequired, deleteUser);
userRouter.route("/clearuser").delete(clearUser);

module.exports = userRouter;
