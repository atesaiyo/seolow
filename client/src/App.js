import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Main from "./components";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import {
  userWasSignIn,
  userWasSignOut,
  updateUserData,
} from "./store/actions/userActions";
import { connect } from "react-redux";
import * as userApi from "./api/userApi";

const jwt = require("jsonwebtoken");

const App = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("tokenSeolow");
    if (token) {
      if (!props.user.username) {
        const { username, admin } = jwt.decode(token);
        const user = { username, admin };
        props.userWasSignIn(user);
        userApi
          .getUser(user)
          .then(({ message, user }) => {
            if (message) {
              props.userWasSignOut();
              localStorage.setItem("tokenSeolow", "");
              return console.log("Sign In Now");
            }
            props.updateUserData(user);
          })
          .catch(() => console.log("Something went wrong!!!"));
      }
    } else if (props.user.username) props.userWasSignOut();
  }, [props]);

  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/register" component={Register} />
      <Route path="/*" component={Main} />
    </Switch>
  );
};

App.propTypes = {
  user: PropTypes.object.isRequired,
  userWasSignIn: PropTypes.func.isRequired,
  userWasSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ user: store.user });
const mapDispatchToProps = {
  userWasSignIn,
  userWasSignOut,
  updateUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
