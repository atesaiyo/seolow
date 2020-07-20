import {
  USER_WAS_SIGNIN,
  USER_DATA,
  USER_WAS_SIGNOUT,
} from "../actions/actionTypes";

const initialState = {
  username: "",
  admin: false,
  name: "",
  email: "",
  phone: "",
  address: "",
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_WAS_SIGNIN:
    case USER_DATA:
      return { ...state, ...action.user };
    case USER_WAS_SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducers;
