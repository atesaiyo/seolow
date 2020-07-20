import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as vali from "../../api/validate";
import { register } from "../../api/userApi";
import showMessage from "../../api/showMessage";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goSignIn, setGoSignIn] = useState(false);

  const registing = (e) => {
    const { target, nativeEvent } = e;
    const cloneEvent = new MouseEvent("click", nativeEvent);
    if (goSignIn) return;
    e.preventDefault();
    e.stopPropagation();
    if (!userName || !password || !name || !email)
      return showMessage("Find in the form!!!");
    if (
      !vali.validateUsername(userName) ||
      !vali.validatePassword(password) ||
      !vali.validateName(name) ||
      !vali.validateEmail(email)
    )
      return showMessage("Wrong input form!!!");
    if (phone)
      if (!vali.validatePhone(phone))
        return showMessage("Wrong phone number!!!");
    const data = {
      username: userName,
      password: password,
      name: name,
      email: email,
      phone: phone,
    };
    register(data)
      .then(({ message }) => {
        if (message) return showMessage(message);
        setGoSignIn(true);
        target.dispatchEvent(cloneEvent);
      })
      .catch(() => showMessage("Something went wrong???"));
  };

  return (
    <div id="register-outer" className="row center-mid">
      <div id="register-inner" className="row center-mid center-col">
        <label className="row col-9">User Name</label>
        <input
          className="row col-9"
          value={userName}
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
        <label className="row col-9">Password</label>
        <input
          className="row col-9"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
        <label className="row col-9">Name</label>
        <input
          className="row col-9"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
        <label className="row col-9">Email</label>
        <input
          className="row col-9"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
        <label className="row col-9">Phone Number</label>
        <input
          className="row col-9"
          value={phone}
          type="text"
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
        <Link
          to="/signin"
          className="row col-9 center-mid"
          onClick={(e) => registing(e)}
        >
          <button className="row col-9 center-mid" type="submit">
            ~~ Register ~~
          </button>
        </Link>
        <Link className="row col-9 center-text" to="/signin">
          <p style={{ color: "blue" }}>Sign In now!</p>
        </Link>
        <div id="message" className="row col-9 center-text"></div>
      </div>
    </div>
  );
};

export default Register;
