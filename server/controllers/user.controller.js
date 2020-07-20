const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { JWT_LIFETIME_SECONDS, JWT_SECRET } = require("../config");

const comparePassword = (password, basePassword) => {
  return bcrypt.compareSync(password, basePassword);
};

const createToken = (user) => {
  const payload = { username: user.username, admin: user.admin };
  const options = { expiresIn: JWT_LIFETIME_SECONDS };
  return jwt.sign(payload, JWT_SECRET, options);
};

const register = (req, res) => {
  let newUser = new User(req.body);
  User.findOne({ username: newUser.username })
    .then((user) => {
      if (user) return res.status(406).json({ message: "User was created!!!" });
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      newUser
        .save()
        .then((user) => {
          user.email = undefined;
          user.password = undefined;
          return res.json({ user: user });
        })
        .catch((err) => {
          res.status(500).json({ message: "Failed to create new user!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new user!!!" });
      throw err;
    });
};

const signIn = (req, res) => {
  const userSignIn = {
    username: req.body.username,
    password: req.body.password,
  };
  User.findOne({ username: userSignIn.username })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found!!!" });
      if (!comparePassword(userSignIn.password, user.password))
        return res.status(401).json({ message: "Authentication failed!!!" });
      return res.json({ token: createToken(user), cart: user.cart });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to sign in!!!" });
      throw err;
    });
};

const getUser = (req, res) => {
  const username = req.body.username;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found!!!" });
      const { username, name, admin, email, phone, address } = user;
      user = { username, name, admin, email, phone, address };
      return res.json({ user: user });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get user data!!!" });
      throw err;
    });
};

const updateUser = (req, res) => {
  const userUpdate = req.user;
  const userUpdateData = req.body;
  const confirmPassword = req.body.confirmPassword;
  const newPassword = req.body.newPassword;
  userUpdateData.confirmPassword = undefined;
  userUpdateData.newPassword = undefined;
  User.findOne({ username: userUpdate.username })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found!!!" });
      if (!comparePassword(userUpdateData.password, user.password))
        return res.status(401).json({ message: "Wrong password!!!" });
      if (newPassword) {
        if (newPassword === confirmPassword)
          return res.status(401).json({ message: "Wrong password!!!" });
        userUpdateData.password = bcrypt.hashSync(newPassword, 10);
      } else {
        userUpdateData.password = user.password;
      }
      User.updateOne(
        { username: userUpdate.username },
        { $set: userUpdateData }
      )
        .exec()
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(500).json({ message: "Failed to update user!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update user!!!" });
      throw err;
    });
};

const updateCart = (req, res) => {
  const cart = req.body;
  User.findOne({ username: cart.username })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found!!!" });
      User.updateOne({ username: cart.username }, { $set: cart })
        .exec()
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(500).json({ message: "Failed to update cart!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update cart!!!" });
      throw err;
    });
};

const forgetPassword = (req, res) => {
  const { username, password, newPassword, confirmEmail } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found!!!" });
      if (!confirmEmail === user.email || !password || newPassword !== password)
        return res.status(401).json({ message: "Wrong confirm data!!!" });
      user.password = bcrypt.hashSync(password, 10);
      User.updateOne({ username: user.username }, { $set: user })
        .exec()
        .then(() => {
          return res.json({ token: createToken(user), cart: user.cart });
        })
        .catch((err) => {
          res.status(500).json({ message: "Failed to change password!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something wrong!!!" });
      throw err;
    });
};

const deleteUser = (req, res) => {
  const userDelete = req.user;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ username: userDelete.username })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found!!!" });
      if (!comparePassword(confirmPassword, user.password))
        return res.status(401).json({ message: "Wrong password!!!" });
      User.deleteOne({ username: userDelete.username })
        .exec()
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(500).json({ message: "Failed to delete user!!!" });
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete user!!!" });
      throw err;
    });
};

const clearUser = (req, res) => {
  User.find().then((users) => {
    users.forEach((user) =>
      User.deleteOne({ _id: user._id }).then((result) => console.log(result))
    );
    const admin = new User({
      username: "admin",
      password: "admin",
      name: "admin",
      email: "admin@gmail.com",
      admin: true,
    });
    admin.password = bcrypt.hashSync(req.body.password, 10);
    admin.save().then((user) => {
      res.json({
        message: "remove " + users.length + " users",
        users: users,
        admin: user,
      });
    });
  });
};

const userControllers = {
  register,
  signIn,
  getUser,
  updateUser,
  updateCart,
  forgetPassword,
  deleteUser,
  clearUser,
};

module.exports = userControllers;
