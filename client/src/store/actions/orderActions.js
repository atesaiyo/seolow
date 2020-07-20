import {
  SET_ORDERS,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
} from "../actions/actionTypes";

const setOrders = (orders) => (dispatch) => {
  dispatch({ type: SET_ORDERS, orders: orders });
};

const createOrder = (order) => (dispatch) => {
  dispatch({ type: CREATE_ORDER, order: order });
};

const updateOrder = (order) => (dispatch) => {
  dispatch({ type: UPDATE_ORDER, order: order });
};

const deleteOrder = (order) => (dispatch) => {
  dispatch({ type: DELETE_ORDER, order: order });
};

export { setOrders, createOrder, updateOrder, deleteOrder };
