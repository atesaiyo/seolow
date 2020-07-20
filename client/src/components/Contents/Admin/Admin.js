import React from "react";
import { Link } from "react-router-dom";

import * as userApi from "../../../api/userApi";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="center-col col-12">
      <h1>Welcome to Admin controls!</h1>
      <div className="col-6 center-text space-between">
        <Link
          to="/orders/Created"
          className="col-5 border-bottom-3 border-blue text-red"
        >
          <h2>Orders</h2>
        </Link>
        <Link
          to="/usermanager"
          className="col-5 border-bottom-3 border-blue text-red"
        >
          <h2>User Manager</h2>
        </Link>
      </div>
      <Link to="/signin">
        <button
          className="button-blue text-white"
          onClick={() => userApi.signOut()}
        >
          ~~ Sign Out ~~
        </button>
      </Link>
    </div>
  );
};

export default Admin;
