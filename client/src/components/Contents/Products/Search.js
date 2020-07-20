import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Product from "./Product";

const Search = (props) => {
  const search = props.location.state.search;
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (props.products[0]) {
      let arr = [];
      search.split(" ").forEach((key) => {
        if (key)
          arr = [
            ...arr,
            ...props.products.filter(
              (product) => product.name.toLowerCase().search(key) >= 0
            ),
          ];
      });
      let resArr = [];
      if (arr.length) resArr.push(arr[0]);
      for (let i = 0; i < arr.length; i++) {
        let add = true;
        for (let j = 0; j < resArr.length; j++) {
          if (arr[i]._id === resArr[j]._id) {
            add = false;
            break;
          }
        }
        if (add) resArr.push(arr[i]);
      }
      setResults(resArr);
    }
  }, [search, props.products]);

  return (
    <div>
      <div className="row col-12">
        {results.length && search ? (
          <h2>Results for: "{search}"</h2>
        ) : (
          <h2>No results for: "{search}"</h2>
        )}
      </div>
      {search ? (
        <div className="row col-12">
          {results.map((product) => (
            <Product  key={product._id} product={product} path={props.location.pathname} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

Search.propsTypes = { products: PropTypes.object.isRequired };

const mapStateToProps = (store) => ({ products: store.products.products });

export default connect(mapStateToProps, null)(Search);
