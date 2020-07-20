import {
  SET_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "./actionTypes";

const setProducts = (products) => (dispatch) => {
  dispatch({ type: SET_PRODUCTS, products: products });
};

const createProduct = (product) => (dispatch) => {
  dispatch({ type: CREATE_PRODUCT, product: product });
};

const updateProduct = (product) => (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT, product: product });
};

const deleteProduct = (product) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT, product: product });
};

export { setProducts, createProduct, updateProduct, deleteProduct };
