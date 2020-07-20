import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteProduct } from "../../../../store/actions/productActions";
import typePrices from "../../../../api/typePrices";
import * as productApi from "../../../../api/productApi";
import * as userApi from "../../../../api/userApi";
import "./ViewProduct.css";

const ViewProduct = (props) => {
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState(
    props.location.state ? props.location.state.product : ""
  );
  const [goBack, setGoBack] = useState(false);
  let cart = JSON.parse(localStorage.getItem("cart"));
  const idProduct = props.match.params.id;
  const [path, setPath] = useState(
    props.location.state ? props.location.state.path : ""
  );

  useEffect(() => {
    if (props.product) return setProduct(props.product);
    const data = { _id: idProduct };
    productApi
      .getProduct(data)
      .then(({ message, product }) => {
        if (message) return console.log(message);
        setProduct(product);
        setPath("/" + product.collected);
      })
      .catch(() => console.log("Something went wrong!!!"));
  }, [idProduct, props.product]);

  const updating = () => {
    if (props.user.name) {
      let itemToPush = { _id: product._id, amount: amount };
      const index = cart.findIndex((item) => item._id === product._id);
      if (index !== -1) {
        itemToPush.amount = amount + cart[index].amount;
        cart = [
          ...cart.slice(0, index),
          itemToPush,
          ...cart.slice(index + 1, cart.length),
        ];
      } else {
        cart = [...cart, itemToPush];
      }
      const data = {
        username: props.user.username,
        cart: cart,
      };
      userApi
        .updateCart(data)
        .then(({ message }) => {
          if (message) return console.log(message);
          localStorage.setItem("cart", JSON.stringify(cart));
        })
        .catch(() => console.log("Cannot update cart!!!"));
    }
  };

  const deleting = (e) => {
    const { target, nativeEvent } = e;
    const cloneEvent = new MouseEvent("click", nativeEvent);
    if (goBack) return;
    e.preventDefault();
    const data = { _id: e.target.parentElement.id };
    if (e.target.parentElement.id)
      if (window.confirm("Are you sure you want to delete this product?"))
        productApi
          .deleteProduct(data)
          .then(({ message }) => {
            if (message) return console.log(message);
            props.deleteProduct(data);
            setGoBack(true);
            target.dispatchEvent(cloneEvent);
          })
          .catch(() => console.log("Cannot delete product!!!"));
  };

  return (
    <Fragment>
      {product ? (
        <div className="row col-12">
          <div className="col-6">
            <img
              className="img-fixed-width img-r"
              src={product.images[0].src}
              alt={product.images[0].alt}
            />
          </div>
          <div className="col-6">
            <div className="row col-12">
              <div className="row col-8">
                <p>{product.name}</p>
                <p>
                  Prices:{" "}
                  <span className="text-orange">
                    {typePrices(product.prices)}.vnd
                  </span>
                </p>
                <input
                  className="row col-12"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <div
                  className="row col-12 center-mid border-all-2-r margin-tb-5"
                  onClick={() => updating()}
                >
                  <img
                    src="./images/icon/icons8_add_shopping_cart.ico"
                    alt="add to cart"
                  />
                </div>
              </div>
              {props.user.admin ? (
                <div className="row col-4 center-col text-black">
                  <Link
                    className="col-6 center-row"
                    to={{
                      pathname: "/editproduct",
                      state: {
                        product: product,
                        path: path,
                        edit: true,
                      },
                    }}
                  >
                    <div>
                      <img
                        src="./images/icon/icons8_edit_property.ico"
                        alt="editproduct"
                      />
                    </div>
                    <p>Edit</p>
                  </Link>
                  <Link
                    id={product._id}
                    onClick={(e) => deleting(e)}
                    to={`${path}`}
                    className="col-6 center-row"
                  >
                    <div id={product._id}>
                      <img
                        src="./images/icon/icons8_delete_view.ico"
                        alt="deleteproduct"
                      />
                    </div>
                    <p>Delete</p>
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="row col-12">
              <p>Details:</p>
              <pre>{product.details}</pre>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

ViewProduct.propsTypes = { user: PropTypes.object.isRequired };

const mapStateToProps = (store) => ({ user: store.user });

const mapDispatchToProps = { deleteProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
