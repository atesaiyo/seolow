import React from "react";
import { Link } from "react-router-dom";

import typePrices from "../../../../api/typePrices";
import "./Order.css";

const Order = (props) => {
  const order = props.order;

  return (
    <Link
      className="row col-12 bg-white border-10 order-border"
      to={`/order/${order._id}`}
    >
      <div>
        <div className="col-3">
          <p>Name: {order.name}</p>
          <p>UserName: {order.username}</p>
          <br />
          <p>
            Costs:{" "}
            <span className="text-orange">{typePrices(order.costs)}.vnd</span>
          </p>
          <p>
            Status: <span className="text-red">{order.info.status}</span>
          </p>
        </div>
        <ul className="col-9 ul-no-style">
          {order.listItems.map((item, i) => {
            if (i > 2) {
              if (i === order.listItems.length - 1)
                return (
                  <li
                    key={item._id}
                    className="li-row col-3 order-fixed-height pos-relative"
                  >
                    <img
                      className="img-fixed-width op-04 img-r"
                      src={item.images[0].src}
                      alt={item.images[0].alt}
                    />
                    <h1 className="see-more">+ {order.listItems.length - 3}</h1>
                  </li>
                );
              return null;
            }
            return (
              <li key={item._id} className="li-row col-3 order-fixed-height">
                <img
                  className="img-fixed-width img-r"
                  src={item.images[0].src}
                  alt={item.images[0].alt}
                />
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Link>
  );
};

export default Order;
