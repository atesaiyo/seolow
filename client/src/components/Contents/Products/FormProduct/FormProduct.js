import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  createProduct,
  updateProduct,
} from "../../../../store/actions/productActions";
import * as productApi from "../../../../api/productApi";
import showMessage from "../../../../api/showMessage";
import "./FormProduct.css";

const FormProduct = (props) => {
  const [editMode] = useState(props.location.state.edit);
  const [formData, setFormData] = useState(new FormData());
  const [name, setName] = useState("");
  const [prices, setPrices] = useState(0);
  const [details, setDetails] = useState("");
  const [collected, setCollected] = useState(
    props.location.state.path
      ? props.location.state.path.match(/[a-z]*$/)[0]
      : "male"
  );
  const [goBack, setGoBack] = useState(false);

  const resetState = () => {
    setName("");
    setPrices(0);
    setDetails("");
    setFormData(new FormData());
    document.getElementById("preview").setAttribute("src", "");
  };

  const preForm = () => {
    let cloneFormData = formData;
    cloneFormData.delete("name");
    cloneFormData.delete("prices");
    cloneFormData.delete("details");
    cloneFormData.delete("collected");

    cloneFormData.append("name", name);
    cloneFormData.append("prices", prices);
    cloneFormData.append("details", details);
    cloneFormData.append("collected", collected);
    if (editMode) cloneFormData.append("_id", props.location.state.product._id);
    setFormData(cloneFormData);
  };

  const appendImage = (images) => {
    const reader = new FileReader();
    reader.readAsDataURL(images[0]);
    reader.onload = (e) => viewImage(e.target.result);
    let cloneFormData = formData;
    cloneFormData.delete("images");
    cloneFormData.append("images", images[0]);
    setFormData(cloneFormData);
  };

  const viewImage = (src, display = "block") => {
    document.getElementById("preview").setAttribute("src", src);
    if (editMode)
      document.getElementById("preview-delete").style.display = display;
  };

  const creating = () => {
    preForm();
    if (!name || !details) return showMessage("Find in the form!!!");
    productApi
      .createProduct(formData)
      .then(({ message, product }) => {
        if (message) return showMessage(message);
        resetState();
        props.createProduct(product);
        showMessage("Success!!!");
      })
      .catch((err) => {
        console.log(err);
        showMessage("Something went wrong???");
      });
  };

  useEffect(() => {
    if (editMode) {
      const product = props.location.state.product;
      document
        .getElementById("preview")
        .setAttribute("src", product.images[0].src);
      setName(product.name);
      setPrices(product.prices);
      setDetails(product.details);
    }
  }, [editMode, props.location.state.product]);

  const removeImage = () => {
    const cloneFormData = formData;
    cloneFormData.delete("images");
    setFormData(cloneFormData);
    viewImage("", "none");
  };

  const updating = (e) => {
    const { target, nativeEvent } = e;
    const cloneEvent = new MouseEvent("click", nativeEvent);
    if (goBack) return;
    e.preventDefault();
    preForm();
    productApi
      .updateProduct(formData)
      .then(({ message }) => {
        if (message) return showMessage(message);
        const data = { _id: props.location.state.product._id };
        productApi
          .getProduct(data)
          .then(({ message, product }) => {
            if (message) return showMessage(message);
            props.updateProduct(product);
            setGoBack(true);
            target.dispatchEvent(cloneEvent);
          })
          .catch(() => showMessage("Something went wrong???"));
      })
      .catch(() => showMessage("Something went wrong???"));
  };

  return (
    <Fragment>
      <div className="row col-6">
        <label className="row col-12">Images</label>
        <input type="file" onChange={(e) => appendImage([e.target.files[0]])} />
        <div className="row col-12">
          {editMode ? (
            <button
              className="row col-1 border-15"
              id="preview-delete"
              style={{ display: "block" }}
              type="button"
              onClick={() => removeImage()}
            >
              x
            </button>
          ) : null}
        </div>
        <div className="row col-12">
          <img id="preview" alt="" className="img-fixed-width img-r" />
        </div>
      </div>
      <div className="row col-6">
        <div className="row col-12">
          <label className="row col-12">Name</label>
          <input
            className="row col-12 bg-alice text-black border-4"
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="row col-12">Prices</label>
          <input
            type="number"
            className="row col-12 bg-alice text-black border-4"
            value={prices}
            placeholder="Enter prices"
            onChange={(e) => setPrices(e.target.value)}
          />
          <label className="row col-12">Details</label>
          <textarea
            className="row col-12 bg-alice text-black border-4"
            rows="25"
            type="textarea"
            value={details}
            placeholder="Enter details"
            onChange={(e) => setDetails(e.target.value)}
          />
          <label className="row col-12">Collected</label>
          <select
            className="row col-12 bg-alice text-black border-4"
            onChange={(e) => setCollected(e.target.value)}
          >
            <option>{collected}</option>
            {collected === "male" ? null : <option>male</option>}
            {collected === "female" ? null : <option>female</option>}
            {collected === "boy" ? null : <option>boy</option>}
            {collected === "girl" ? null : <option>girl</option>}
          </select>
        </div>
        {!editMode ? (
          <button
            className="row col-12 button-green text-white"
            type="button"
            onClick={() => creating()}
          >
            ~~ Add ~~
          </button>
        ) : (
          <Link to={`/product/${props.location.state.product._id}`}>
            <button
              className="row col-12"
              type="button"
              onClick={(e) => updating(e)}
            >
              ~~ Update ~~
            </button>
          </Link>
        )}
        <div className="row col-12" id="message"></div>
      </div>
    </Fragment>
  );
};

FormProduct.propsTypes = {
  createProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
};

const mapDispatchToProps = { createProduct, updateProduct };

export default connect(null, mapDispatchToProps)(FormProduct);
