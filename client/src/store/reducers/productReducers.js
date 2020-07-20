import {
  SET_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/actionTypes";

const initialState = {
  products: [],
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products.reverse() };
    case CREATE_PRODUCT:
      return { ...state, products: [action.product, ...state.products] };
    case UPDATE_PRODUCT: {
      const index = state.products.findIndex(
        (product) => product._id === action.product._id
      );
      const cloneState = state.products;
      cloneState.splice(index, 1, action.product);
      return {
        ...state,
        products: cloneState,
      };
    }
    case DELETE_PRODUCT: {
      const index = state.products.findIndex(
        (product) => product._id === action.product._id
      );
      const cloneState = state.products;
      cloneState.splice(index, 1);
      return { ...state, products: cloneState };
    }
    default:
      return state;
  }
};

export default productReducers;
