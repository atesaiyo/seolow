import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Error404 from "./Error404";
import HomePage from "./HomePage";
import Products from "./Products";
import FormProduct from "./Products/FormProduct";
import ViewProduct from "./Products/ViewProduct";
import Admin from "./Admin";
import UserManager from "./Admin/UserManager";
import Profile from "./Profile";
import Cart from "./Profile/Cart";
import Orders from "./Orders";
import ViewOrder from "./Orders/ViewOrder";
import "./Contents.css";

const Contents = (props) => {
  const adminRoute = [
    { path: "/admin", component: Admin },
    { path: "/createproduct", component: FormProduct },
    { path: "/editproduct", component: FormProduct },
    { path: "/usermanager", component: UserManager },
    { path: "/orders/:status", component: Orders },
    { path: "/order/:id", component: ViewOrder },
  ];
  const userRoute = [
    { path: "/profile", component: Profile },
    { path: "/cart", component: Cart },
    { path: "/orders/:status", component: Orders },
    { path: "/order/:id", component: ViewOrder },
  ];

  return (
    <div id="contents-outer" className="row center-col">
      <img id="img-bg" alt="bg" src="/bg.jpg" />
      <div id="contents-inner" className="row col-7 border-15">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path={["/male", "/female", "/boy", "/girl"]}
            component={Products}
          />
          {props.user.username
            ? userRoute.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                />
              ))
            : null}
          {props.user.admin
            ? adminRoute.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                />
              ))
            : null}
          <Route path="/product/search" component={Products} />
          <Route path="/product/:id" component={ViewProduct} />
          <Route component={Error404} />
        </Switch>
      </div>
    </div>
  );
};

Contents.propsTypes = { user: PropTypes.object.isRequired };

const mapStateToProps = (store) => ({ user: store.user });

export default connect(mapStateToProps, null)(Contents);
