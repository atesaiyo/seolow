import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import * as vali from "../../api/validate";
import { signIn, forgetPassword } from "../../api/userApi";
import showMessage from "../../api/showMessage";
import "./SignIn.css";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [forget, setForget] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [goHome, setGoHome] = useState(false);

  const forgeting = (e) => {
    const { target, nativeEvent } = e;
    const cloneEvent = new MouseEvent("click", nativeEvent);
    if (goHome) return;
    e.preventDefault();
    e.stopPropagation();
    if (!userName || !password || !newPassword || !confirmEmail)
      return showMessage("Find in the form!!!");
    if (
      !vali.validateUsername(userName) ||
      !vali.validatePassword(password) ||
      !vali.validatePassword(newPassword) ||
      !vali.validateEmail(confirmEmail)
    )
      return showMessage("Wrong input form!!!");
    const data = {
      username: userName,
      password: password,
      newPassword: newPassword,
      confirmEmail: confirmEmail,
    };
    forgetPassword(data)
      .then(({ message }) => {
        if (message) return showMessage(message);
        setGoHome(true);
        target.dispatchEvent(cloneEvent);
      })
      .catch(() => showMessage("Something went wrong???"));
  };

  const signIning = (e) => {
    const { target, nativeEvent } = e;
    const cloneEvent = new MouseEvent("click", nativeEvent);
    if (goHome) return;
    e.preventDefault();
    e.stopPropagation();
    if (!userName || !password) return showMessage("Find in the form!!!");
    if (!vali.validateUsername(userName) || !vali.validatePassword(password))
      return showMessage("Wrong input form!!!");
    const data = {
      username: userName,
      password: password,
    };
    signIn(data)
      .then(({ message }) => {
        if (message) return showMessage(message);
        setGoHome(true);
        target.dispatchEvent(cloneEvent);
      })
      .catch(() => showMessage("Something went wrong???"));
  };

  return (
    <div id="signin-outer" className="row center-mid">
      <div id="signin-inner" className="row center-mid center-col">
        <label className="row col-9">User Name</label>
        <input
          className="row col-9"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
        <label className="row col-9">Password</label>
        <input
          className="row col-9"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
        {forget ? (
          <Fragment>
            <label className="row col-9">New Password</label>
            <input
              className="row col-9"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
            <label className="row col-9">Confirm Email</label>
            <input
              className="row col-9"
              type="test"
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <div className="row col-9 right-text">\\\\\\\\\\\\\\\\</div>
            <Link to="/" className="row col-9 center-mid">
              <button
                className="row col-9 center-mid"
                type="button"
                onClick={(e) => forgeting(e)}
              >
                ~~ Forget ~~
              </button>
            </Link>
            <p style={{ color: "blue" }} onClick={() => setForget(!forget)}>
              Sign In!
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <Link
              to="/"
              className="row col-9 center-mid"
              onClick={(e) => signIning(e)}
            >
              <button className="row col-9 center-mid" type="button">
                ~~ Sign In ~~
              </button>
            </Link>
            <div className="row col-9">
              <Link className="row col-6" to="/register">
                <p style={{ color: "blue" }}>Register now!</p>
              </Link>
              <p
                className="row col-6 right-text"
                style={{ color: "blue" }}
                onClick={() => setForget(!forget)}
              >
                Forget password?
              </p>
            </div>
          </Fragment>
        )}
        <div id="message" className="row col-9 center-text"></div>
      </div>
    </div>
  );
};

export default SignIn;
