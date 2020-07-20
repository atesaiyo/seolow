import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as productApi from "../../../api/productApi";
import { setProducts } from "../../../store/actions/productActions";
import Product from "./Product";
import Search from "./Search";

const Products = (props) => {
  const [old, setOld] = useState("");
  const [pager, setPager] = useState({
    title: "",
    products: [],
    collected: "",
  });

  useEffect(() => {
    let page = document.getElementById(
      props.location.pathname.match(/[a-z]*$/)[0] + "-ac"
    );
    if (page) page.style.color = "red";
    if (
      old &&
      old !== props.location.pathname.match(/[a-z]*$/)[0] &&
      document.getElementById(old + "-ac")
    )
      document.getElementById(old + "-ac").style.color = "white";
    setOld(props.location.pathname.match(/[a-z]*$/)[0]);
    if (props.products.products.length === 0) {
      productApi
        .getProducts()
        .then(({ message, products }) => {
          if (!message && products.length) props.setProducts(products);
        })
        .catch(() => console.log("Cannot get data!!!"));
    } else {
      const checker = ({ type, title }) => {
        const currentProducts = props.products.products.filter(
          (product) => product.collected === type
        );
        if (
          pager.collected !== type ||
          (pager.products.length !== currentProducts.length &&
            pager.products.length !== 0)
        )
          setPager({
            title: title,
            products: currentProducts,
            collected: type,
          });
      };
      switch (props.location.pathname) {
        case "/male": {
          checker({ type: "male", title: "Male" });
          break;
        }
        case "/female": {
          checker({ type: "female", title: "Female" });
          break;
        }
        case "/boy": {
          checker({ type: "boy", title: "Boy" });
          break;
        }
        case "/girl": {
          checker({ type: "girl", title: "Girl" });
          break;
        }
        default:
          break;
      }
    }
    return () => {
      if (old && document.getElementById(old + "-ac"))
        document.getElementById(old + "-ac").style.color = "white";
    };
  }, [pager.collected, pager.products.length, props, old]);

  return (
    <Switch>
      <Route path="/product/search" component={Search} />
      <Route
        path="/"
        component={() => (
          <div>
            <div className="row col-12">
              {props.user.admin ? (
                <div>
                  <Link
                    to={{
                      pathname: "/createproduct",
                      state: { path: props.location.pathname },
                    }}
                    className="col-1 center-mid"
                  >
                    <img src="./images/icon/icons8_plus.ico" alt="plus" />
                  </Link>
                  <h1 className="row col-10 center-text border-bottom-1">
                    {pager.title}
                  </h1>
                </div>
              ) : (
                <h1 className="row col-12 center-text border-bottom-1">
                  {pager.title}
                </h1>
              )}
            </div>
            <div className="row col-12">
              {pager.products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  path={props.location.pathname}
                />
              ))}
            </div>
          </div>
        )}
      />
    </Switch>
  );
};

Products.propsTypes = {
  user: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  setProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  user: store.user,
  products: store.products,
});

const mapDispatchToProps = { setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
