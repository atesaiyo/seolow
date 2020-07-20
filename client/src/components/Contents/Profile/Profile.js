import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as vali from "../../../api/validate";
import * as userApi from "../../../api/userApi";
import showMessage from "../../../api/showMessage";
import {
  updateUserData,
  userWasSignOut,
} from "../../../store/actions/userActions";
import "./Profile.css";

const Profile = (props) => {
  const [edit, setEdit] = useState(false);
  const [username] = useState(props.user.username);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(props.user.admin);
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [phone, setPhone] = useState(props.user.phone);
  const [address, setAddress] = useState(props.user.address);
  const [goTo, setGoto] = useState(false);

  useEffect(() => {
    if (!props.user.name) {
      const data = { username: props.user.username };
      userApi
        .getUser(data)
        .then(({ message, user }) => {
          if (message) return showMessage(message);
          props.updateUserData(user);
          setName(user.name);
          setEmail(user.email);
          setPhone(user.phone);
          setAddress(user.address);
        })
        .catch(() => showMessage("Something went wrong!!!"));
    }
  }, [props]);

  const updating = () => {
    if (
      !name ||
      !password ||
      !email ||
      (newPassword && !confirmPassword) ||
      (!newPassword && confirmPassword)
    )
      return showMessage("Find in the form!!!");
    if (
      !vali.validateName(name) ||
      !vali.validatePassword(password) ||
      !vali.validateEmail(email)
    )
      return showMessage("Wrong input form!!!");
    if (phone)
      if (!vali.validatePhone(phone))
        return showMessage("Wrong phone number!!!");
    if (address)
      if (!vali.validateInjection(address))
        return showMessage("Address not good!!!");
    const data = {
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      admin: admin,
      name: name,
      email: email,
      phone: phone,
      address: address,
    };
    userApi
      .updateUser(data)
      .then(({ message }) => {
        if (message) return showMessage(message);
        setEdit(false);
        data.password = undefined;
        data.confirmPassword = undefined;
        props.updateUserData({ user: data });
      })
      .catch(() => showMessage("Something went wrong!!!"));
  };

  const deleting = (e) => {
    const { target, nativeEvent } = e;
    const cloneEvent = new MouseEvent("click", nativeEvent);
    if (goTo) return;
    e.preventDefault();
    const data = {
      confirmPassword: confirmPassword,
    };
    if (!confirmPassword)
      return showMessage("Please enter confirm password!!!");
    if (!window.confirm("Please, dont leave :<<<"))
      userApi
        .deleteUser(data)
        .then(({ message }) => {
          if (message) return showMessage(message);
          props.userWasSignOut();
          userApi.signOut();
          setGoto(true);
          target.dispatchEvent(cloneEvent);
        })
        .catch(() => console.log("Something went wrong!!!"));
  };

  return (
    <div id="profile" className="center-col">
      {props.user.name ? (
        edit ? (
          <div className="col-10">
            <div className="col-12">
              <label className="col-3">User Name</label>
              <input className="col-9" type="text" value={username} disabled />
            </div>
            <div className="col-12">
              <label className="col-3">Password</label>
              <input
                className="col-9"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="col-3">New Password</label>
              <input
                className="col-9"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="col-3">Confirm Password</label>
              <input
                className="col-9"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="col-3">Admin</label>
              <input
                className="col-9"
                type="button"
                value={admin}
                onClick={() => setAdmin(!admin)}
              />
            </div>
            <div className="col-12">
              <label className="col-3">Name</label>
              <input
                className="col-9"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="col-3">Email</label>
              <input
                className="col-9"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="col-3">Phone Number</label>
              <input
                className="col-9"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="col-3">Address</label>
              <input
                className="col-9"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-12 space-evenly">
              <button
                className="button-green text-white"
                type="button"
                onClick={() => updating()}
              >
                Confirm
              </button>
              <Link to="/signin">
                <button
                  className="button-red text-white"
                  type="button"
                  onClick={(e) => deleting(e)}
                >
                  Delete Account
                </button>
              </Link>
              <button
                className="button-orange text-white"
                onClick={() => setEdit(!edit)}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="col-10">
            <div className="col-12">
              <p className="col-3 border-lt-2 border-blue">User Name</p>
              <p className="col-9 border-lb-2 border-blue">{username}</p>
            </div>
            <div className="col-12">
              <p className="col-3 border-lt-2 border-blue">Name</p>
              <p className="col-9 border-lb-2 border-blue">{name}</p>
            </div>
            <div className="col-12">
              <p className="col-3 border-lt-2 border-blue">Email</p>
              <p className="col-9 border-lb-2 border-blue">{email}</p>
            </div>
            <div className="col-12">
              <p className="col-3 border-lt-2 border-blue">Phone</p>
              <p className="col-9 border-lb-2 border-blue">{phone || "..."}</p>
            </div>
            <div className="col-12">
              <p className="col-3 border-lt-2 border-blue">Address</p>
              <p className="col-9 border-lb-2 border-blue">
                {address || "..."}
              </p>
            </div>
            <div className="col-12">
              <div onClick={() => setEdit(!edit)} className="col-4">
                <div className="col-3">
                  <img
                    src="./images/icon/icons8_edit_property.ico"
                    alt="editprofile"
                  />
                </div>
                <p className="col-6">Edit</p>
              </div>
              <Link to="/orders/Created" className="col-4 text-black">
                <div className="col-3">
                  <img
                    src="./images/icon/icons8_shopping_cart.ico"
                    alt="cart"
                  />
                </div>
                <p className="col-6">Orders List</p>
              </Link>
            </div>
            <Link to="/signin" className="col-12">
              <button
                className="button-blue text-white"
                onClick={() => userApi.signOut()}
              >
                ~~ Sign Out ~~
              </button>
            </Link>
          </div>
        )
      ) : (
        <Link to="/signin">
          <button
            className="button-blue text-white"
            onClick={() => userApi.signOut()}
          >
            ~~ Sign Out ~~
          </button>
        </Link>
      )}
      <p id="message"></p>
    </div>
  );
};

const mapStateToProps = (store) => ({ user: store.user });

const mapDispatchToProps = { updateUserData, userWasSignOut };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
