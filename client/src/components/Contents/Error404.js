import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => (
  <div className="center-col mid-dis">
    <Link to="/">
      <img src="/images/seolow.png" alt="seolow" />
    </Link>
    <h1>404 Error</h1>
    <p>Page not found</p>
    <p>Please go back to homepage</p>
  </div>
);

export default Error404;
