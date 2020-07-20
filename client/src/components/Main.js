import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import Contents from "./Contents";

const Main = () => {
  return (
    <Fragment>
      <NavBar />
      <Route path="/*" component={Contents} />
      <Footer />
    </Fragment>
  );
};

export default Main;
