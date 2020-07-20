import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  updateOrder,
  deleteOrder,
} from "../../../../store/actions/orderActions";
import * as orderApi from "../../../../api/orderApi";
import typePrices from "../../../../api/typePrices";
import showMessage from "../../../../api/showMessage";
import "./ViewOrder.css";

const ViewOrder = (props) => {
  const [order, setOrder] = useState("");
  const idOrder = props.match.params.id;
  const [goBack, setGoBack] = useState(false);

  useEffect(() => {
    const data = { _id: idOrder, username: props.user.username };
    orderApi
      .getOrder(data)
      .then(({ message, order }) => {
        if (message) return console.log(message);
        setOrder(order);
      })
      .catch(() => console.log("Something went wrong!!!"));
  }, [idOrder, props.user.username]);

  const chageStatus = (status) => {
    let data = { ...order };
    data.info.status = status;
    const date = new Date();
    let hourTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let dayTime =
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    switch (status) {
      case "Confirmed":
        if (window.confirm("Are you sure you want to Confirmed this order"))
          data.info.dateConfirmed = hourTime + " " + dayTime;
        break;
      case "Sended":
        if (window.confirm("Are you sure you want to Sended this order"))
          data.info.dateSended = hourTime + " " + dayTime;
        break;
      case "Completed":
        if (window.confirm("Are you sure you want to Completed this order"))
          data.info.dateCompleted = hourTime + " " + dayTime;
        break;
      case "Cancelled":
        if (window.confirm("Are you sure you want to cancel this order"))
          data.info.dateCancelled = hourTime + " " + dayTime;
        break;
      default:
    }
    orderApi
      .updateOrder(data)
      .then(({ message }) => {
        if (message) return showMessage(message);
        setOrder(data);
        props.updateOrder(data);
      })
      .catch(() => showMessage("Something went wrong!!!"));
  };

  const deleteOrder = (e) => {
    const { target, nativeEvent } = e;
    const cloneEvent = new MouseEvent("click", nativeEvent);
    if (goBack) return;
    e.preventDefault();
    const data = { _id: idOrder };
    if (window.confirm("Are you sure you want to delete this order?"))
      orderApi
        .deleteOrder(data)
        .then(({ message }) => {
          if (message) return showMessage(message);
          props.deleteOrder(idOrder);
          setGoBack(true);
          target.dispatchEvent(cloneEvent);
        })
        .catch(() => showMessage("Something went wrong!!!"));
  };

  return (
    <Fragment>
      {order ? (
        <Fragment>
          <div id="message"></div>
          <div className="row col-12">
            <div className="col-4">
              <p>Name: {order.name}</p>
              <p>UserName: {order.username}</p>
              <p>
                Costs:{" "}
                <span className="text-orange">
                  {typePrices(order.costs)}.vnd
                </span>
              </p>
            </div>
            <div className="col-6">
              <h3 className="text-red">{order.info.status}</h3>
              <p>Created: {order.info.dateCreated || "..."}</p>
              <p>Confirmed: {order.info.dateConfirmed || "..."}</p>
              <p>Sended: {order.info.dateSended || "..."}</p>
              <p>Completed: {order.info.dateCompleted || "..."}</p>
              <p>Cancelled: {order.info.dateCancelled || "..."}</p>
            </div>
            <div className="col-2">
              {props.user.admin ? (
                <Fragment>
                  {order.info.dateCancelled ||
                  order.info.dateCompleted ? null : order.info.dateSended ? (
                    <button
                      className="button-blue text-white"
                      type="button"
                      onClick={() => chageStatus("Completed")}
                    >
                      Completed
                    </button>
                  ) : order.info.dateConfirmed ? (
                    <button
                      className="button-blue text-white"
                      type="button"
                      onClick={() => chageStatus("Sended")}
                    >
                      Sended
                    </button>
                  ) : (
                    <button
                      className="button-blue text-white"
                      type="button"
                      onClick={() => chageStatus("Confirmed")}
                    >
                      Confirmed
                    </button>
                  )}
                </Fragment>
              ) : null}
              {!order.info.dateCancelled ? (
                <button
                  className="button-red text-white"
                  type="button"
                  onClick={() => chageStatus("Cancelled")}
                >
                  Cancel
                </button>
              ) : null}
              {props.user.admin ? (
                <Link to="/orders/Created">
                  <button
                    className="button-red text-white"
                    type="button"
                    onClick={(e) => deleteOrder(e)}
                  >
                    Delete
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
          <ul className="row col-12 ul-no-style">
            {order.listItems.map((item) => (
              <li
                key={item._id}
                className="col-6 li-row border-rb-2 border-orange border-15 padding-20"
              >
                <Link
                  to={{
                    pathname: `/product/${item._id}`,
                    state: { product: item },
                  }}
                >
                  <div className="col-6 center-row">
                    <img
                      className="img-fixed-width"
                      src={item.images[0].src}
                      alt={item.images[0].alt}
                    />
                  </div>
                  <p>{item.name}</p>
                  <p>
                    {typePrices(item.prices)} x {item.amount} ={" "}
                    <span className="text-orange">
                      {typePrices(item.amount * item.prices)}
                      .vnd
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

ViewOrder.propsTypes = {
  user: PropTypes.object.isRequired,
  updateOrder: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ user: store.user });

const mapDispatchToProps = { updateOrder, deleteOrder };

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);
