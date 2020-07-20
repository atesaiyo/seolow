import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import typePrices from "../../../../api/typePrices";
import "./Product.css";

const Product = (props) => {
  const product = props.product;

  return (
    <Link
      key={product._id}
      className="col-3 bg-white border-15 border-product product-fixed-height"
      to={{
        pathname: `/product/${product._id}`,
        state: { product: product, path: props.path },
      }}
    >
      <div className="row col-12 center-row">
        <img
          className="img-fixed-width img-r"
          src={product.images[0].src}
          alt={product.images[0].alt}
        />
      </div>
      <div className="row col-12">
        <h4 className="text-orange">{typePrices(product.prices)}.vnd</h4>
        <p>
          {product.name.length > 35
            ? product.name.slice(0, 35) + " ....."
            : product.name}
        </p>
      </div>
    </Link>
  );
};

Product.propsTypes = {
  user: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default Product;
