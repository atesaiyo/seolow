import {
  SET_ORDERS,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
} from "../actions/actionTypes";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.orders };
    case CREATE_ORDER:
      return { ...state, orders: [...state.orders, action.order] };
    case UPDATE_ORDER: {
      const cloneOrders = state.orders;
      const indexOrder = state.orders.findIndex(
        (order) => order._id === action.order._id
      );
      cloneOrders.splice(indexOrder, 1, action.order);
      return { ...state, orders: cloneOrders };
    }
    case DELETE_ORDER: {
      const cloneOrders = state.orders;
      const indexOrder = state.orders.findIndex(
        (order) => order._id === action.order._id
      );
      cloneOrders.splice(indexOrder, 1);
      return { ...state, orders: cloneOrders };
    }
    default:
      return state;
  }
};

export default orderReducer;
