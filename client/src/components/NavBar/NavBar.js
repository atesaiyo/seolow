import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./NavBar.css";

const NavBar = ({ user }) => {
  const [search, setSearch] = useState("");

  return (
    <div id="navbar-outer" className="row col-12 center-mid">
      <div id="navbar-inner" className="row col-8 center-full">
        <img id="homepage-image" src="./images/homepage.png" alt="homepage" />
        <Link className="col-3 center-text" to="/">
          <h1 id="homepage-name">Seo low</h1>
        </Link>
        <div className="col-4 center-row">
          <ul className="ul-no-style">
            <li className="li-row pdr-10 pdl-5">
              <Link to="/male">
                <h3 id="male-ac">Male</h3>
              </Link>
            </li>
            <li className="li-row pdr-10">
              <Link to="/female">
                <h3 id="female-ac">Female</h3>
              </Link>
            </li>
            <li className="li-row pdr-10">
              <Link to="/boy">
                <h3 id="boy-ac">Boy</h3>
              </Link>
            </li>
            <li className="li-row pdr-10">
              <Link to="/girl">
                <h3 id="girl-ac">Girl</h3>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-3 center-mid">
          <input
            id="search-input"
            placeholder="Search the products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            to={{ pathname: "/product/search", state: { search: search } }}
            className="center-mid"
          >
            <img src="./images/icon/icons8_search.ico" alt="search" />
          </Link>
        </div>
        <div className="col-2 center-row space-between">
          <Link to="/">
            <img src="./images/icon/icons8_home.ico" alt="homepage" />
          </Link>
          {user.username ? (
            user.admin ? (
              <Link to="/orders/Created">
                <img
                  src="./images/icon/icons8_bulleted_list.ico"
                  alt="orders"
                />
              </Link>
            ) : (
              <Link to="/cart">
                <img src="./images/icon/icons8_shopping_cart.ico" alt="cart" />
              </Link>
            )
          ) : (
            <Link to="/signin">
              <img src="./images/icon/icons8_shopping_cart.ico" alt="cart" />
            </Link>
          )}

          {user.username ? (
            user.admin ? (
              <Link to="/admin">
                <img
                  src="./images/icon/icons8_administrator_male.ico"
                  alt="login-signup"
                />
              </Link>
            ) : (
              <Link to="/profile">
                <img
                  src="./images/icon/icons8_customer.ico"
                  alt="login-signup"
                />
              </Link>
            )
          ) : (
            <Link to="/signin">
              <img src="./images/icon/icons8_customer.ico" alt="login-signup" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

NavBar.propsTypes = { user: PropTypes.object.isRequired };

const mapStateToProps = (store) => ({ user: store.user });

export default connect(mapStateToProps, null)(NavBar);
