import { combineReducers } from "redux";

import userReducers from "./userReducers";
import productReducers from "./productReducers";
import orderReducers from "./orderReducers";

const reducers = combineReducers({
  user: userReducers,
  products: productReducers,
  orders: orderReducers,
});

export default reducers;
