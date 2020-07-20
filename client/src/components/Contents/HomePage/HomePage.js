import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./HomePage.css";

const HomePage = (props) => {
  return (
    <div className="row col-12 center-mid mid-dis">
      <div className="row col-12">
        <div className="col-12">
          <img
            className="float-right"
            src="./images/seolow.png"
            alt="homepage"
          />
        </div>
        <div className="col-6 center-col">
          <h1 className="text-red">SEO LOW</h1>
          <p>the simple way to buy clothes</p>
          <br />
          {!props.user.username ? (
            <div className="row col-12 center-mid">
              <Link to="/register">
                <button type="button" className="button-blue text-white">
                  Register
                </button>
              </Link>
              <Link to="/signin">
                <button type="button" className="button-green text-white">
                  Sign In
                </button>
              </Link>
            </div>
          ) : (
            <h4>Thask you for Register, let purcharse some clothes</h4>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({ user: store.user });

export default connect(mapStateToProps, null)(HomePage);
