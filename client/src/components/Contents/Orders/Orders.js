import React, { Fragment, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setOrders } from "../../../store/actions/orderActions";
import * as orderApi from "../../../api/orderApi";
import Order from "./Order";
import "./Orders.css";

const Orders = (props) => {
  const status = props.match.params.status;

  useEffect(() => {
    if (props.orders.length === 0) {
      if (props.user.admin) {
        orderApi
          .getOrders()
          .then(({ message, orders }) => {
            if (!message && orders.length !== 0) props.setOrders(orders);
          })
          .catch(() => console.log("Cannot get data!!!"));
      } else if (props.user.username) {
        let data = { username: props.user.username };
        orderApi
          .getUserOrders(data)
          .then(({ message, userOrders }) => {
            if (!message && userOrders.length !== 0)
              props.setOrders(userOrders);
          })
          .catch(() => console.log("Cannot get data!!!"));
      }
    }
  }, [props]);

  return (
    <Fragment>
      <ul className="row col-12 ul-no-style space-evenly">
        <li className="li-row col-2 center-text border-bottom-1 border-10">
          <Link to="/orders/Created">
            Created
            <p className="text-orange">
              (
              {
                props.orders.filter((order) => order.info.status === "Created")
                  .length
              }
              )
            </p>
          </Link>
        </li>
        <li className="li-row col-2 center-text border-bottom-1 border-10">
          <Link to="/orders/Confirmed">
            Confirmed
            <p className="text-orange">
              (
              {
                props.orders.filter(
                  (order) => order.info.status === "Confirmed"
                ).length
              }
              )
            </p>
          </Link>
        </li>
        <li className="li-row col-2 center-text border-bottom-1 border-10">
          <Link to="/orders/Sended">
            Sended
            <p className="text-orange">
              (
              {
                props.orders.filter((order) => order.info.status === "Sended")
                  .length
              }
              )
            </p>
          </Link>
        </li>
        <li className="li-row col-2 center-text border-bottom-1 border-10">
          <Link to="/orders/Completed">
            Completed
            <p className="text-orange">
              (
              {
                props.orders.filter(
                  (order) => order.info.status === "Completed"
                ).length
              }
              )
            </p>
          </Link>
        </li>
        <li className="li-row col-2 center-text border-bottom-1 border-10">
          <Link to="/orders/Cancelled">
            Cancelled
            <p className="text-orange">
              (
              {
                props.orders.filter(
                  (order) => order.info.status === "Cancelled"
                ).length
              }
              )
            </p>
          </Link>
        </li>
      </ul>
      <Route></Route>
      {props.orders.length !== 0 ? (
        <Fragment>
          {props.orders
            .filter((order) => order.info.status === status)
            .map((order) => (
              <Order order={order} key={order._id} />
            ))}
        </Fragment>
      ) : (
        <p>No Order Here</p>
      )}
    </Fragment>
  );
};

Orders.propsTypes = {
  user: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  setOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  user: store.user,
  orders: store.orders.orders,
});

const mapDispatchToProps = { setOrders };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
