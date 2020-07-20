import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as productApi from "../../../../api/productApi";
import * as orderApi from "../../../../api/orderApi";
import * as userApi from "../../../../api/userApi";
import typePrices from "../../../../api/typePrices";
import { createOrder } from "../../../../store/actions/orderActions";
import "./Cart.js";

const Cart = (props) => {
  const [cart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [updateCart, setUpdateCart] = useState(false);
  const [costs, setCosts] = useState(0);
  const [listItems, setListItem] = useState([]);
  const [edit, setEdit] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [goToOrder, setGoToOrder] = useState(false);

  useEffect(() => {
    let getList = [];
    cart.forEach((item) =>
      productApi
        .getProduct(item)
        .then(({ message, product }) => {
          if (message) return console.log(message);
          else {
            product.amount = item.amount;
            getList = [...getList, product];
            if (getList.length === cart.length) {
              setListItem(getList);
              setCosts(
                getList.reduce(
                  (sum, item) => sum + item.amount * item.prices,
                  0
                )
              );
            }
          }
        })
        .catch(() => console.log(`False to get item ${item._id}`))
    );
  }, [cart]);

  const changeAmount = (e) => {
    if (e.target.value > -1) {
      let cloneList = [...listItems];
      cloneList[
        cloneList.findIndex(
          (product) => product._id === e.target.parentElement.parentElement.id
        )
      ].amount = e.target.value;
      setListItem(cloneList);
      setCosts(
        cloneList.reduce((sum, item) => sum + item.amount * item.prices, 0)
      );
      setUpdateCart(true);
    }
  };

  const removeItem = (e) => {
    let cloneList = [...listItems];
    cloneList.splice(
      cloneList.findIndex(
        (product) => product._id === e.target.parentElement.id
      ),
      1
    );
    setListItem(cloneList);
    setCosts(
      cloneList.reduce((sum, item) => sum + item.amount * item.prices, 0)
    );
    setUpdateCart(true);
  };

  const updatingCart = (newCart) => {
    const data = {
      username: props.user.username,
      cart: newCart,
    };
    userApi
      .updateCart(data)
      .then(({ message }) => {
        if (message) return console.log(message);
        localStorage.setItem("cart", JSON.stringify(newCart));
      })
      .catch(() => console.log("Cannot update cart!!!"));
  };

  const checkRemove = () => {
    const newList = listItems.filter((item) => item.amount !== "0");
    const newCart = listItems.map((item) => ({
      _id: item._id,
      amount: item.amount,
    }));
    if (newList.length !== listItems.length) {
      if (window.confirm("Remove those item?")) {
        updatingCart(newCart);
        setListItem(newList);
        setEdit(!edit);
      }
    } else if (updateCart) {
      updatingCart(newCart);
      setEdit(!edit);
    } else {
      setEdit(!edit);
    }
  };

  const creating = (e) => {
    const { target, nativeEvent } = e;
    const cloneEvent = new MouseEvent("click", nativeEvent);
    if (goToOrder) return;
    e.preventDefault();
    if (!props.user.phone || !props.user.address)
      return window.alert("Please complete your profile fist.");
    const data = {
      username: props.user.username,
      listItems: listItems,
      costs: costs,
    };
    orderApi
      .createOrder(data)
      .then(({ message, order }) => {
        if (message) return console.log(message);
        props.createOrder(order);
        updatingCart([]);
        setOrderId(order._id);
        setGoToOrder(true);
        target.dispatchEvent(cloneEvent);
      })
      .catch(() => console.log("Something went wrong!!!"));
  };

  return (
    <Fragment>
      <div className="row col-12">
        <Link
          to="/orders/Created"
          className="col-2 border-lb-2 border-orange border-10"
        >
          See Your Order
        </Link>
        {edit ? (
          <div
            className="col-2 right-text float-right border-10"
            onClick={() => checkRemove()}
          >
            Save
          </div>
        ) : listItems.length !== 0 ? (
          <div
            className="col-2 right-text border-rb-2 border-orange float-right border-10"
            onClick={() => setEdit(!edit)}
          >
            Edit
          </div>
        ) : null}
      </div>
      {listItems.map((item) => (
        <div
          key={item._id}
          id={item._id}
          className="row col-12 bg-alice margin-5 border-10"
        >
          <Link to={`/product/${item._id}`}>
            <img
              className="col-2"
              src={item.images[0].src}
              alt={item.images[0].alt}
            />
            <div className="col-7">
              <h3>{item.name}</h3>
              <h4 className="text-orange">{typePrices(item.prices)}.vnd</h4>
            </div>
          </Link>
          <div className="col-3">
            {edit ? (
              <Fragment>
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => changeAmount(e)}
                />
                <p className="text-orange">
                  {typePrices(item.amount * item.prices)}.vnd
                </p>
                <div onClick={(e) => removeItem(e)}>Remove</div>
              </Fragment>
            ) : (
              <Fragment>
                <p>x {item.amount}</p>
                <p className="text-orange">
                  {typePrices(item.amount * item.prices)}.vnd
                </p>
              </Fragment>
            )}
          </div>
        </div>
      ))}
      {listItems.length !== 0 ? (
        <div className="row col-12">
          <div className="row col-6">
            <p>Total: </p>
            <h2 className="text-orange">{typePrices(costs)}.vnd</h2>
          </div>
          <div className="row col-6 right-text">
            <Link to={`/order/${orderId}`}>
              <button
                className="button-orange text-white"
                type="button"
                onClick={(e) => creating(e)}
              >
                Order Now
              </button>
            </Link>
          </div>
        </div>
      ) : null}
      {listItems.length === 0 ? (
        <div className="row col-12 center-text">
          <p>Nothing here</p>
          <p>Go to shop and buy now!</p>
        </div>
      ) : null}
    </Fragment>
  );
};

Cart.propsTypes = {
  user: PropTypes.object.isRequired,
  createOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ user: store.user });

const mapDispatchToProps = { createOrder };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
