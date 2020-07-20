import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App.js";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/*" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
