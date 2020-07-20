import { USER_WAS_SIGNIN, USER_DATA, USER_WAS_SIGNOUT } from "./actionTypes";

const userWasSignIn = (user) => (dispatch) => {
  dispatch({ type: USER_WAS_SIGNIN, user: user });
};

const updateUserData = (user) => (dispatch) => {
  dispatch({ type: USER_DATA, user: user });
};

const userWasSignOut = () => (dispatch) => {
  dispatch({ type: USER_WAS_SIGNOUT });
};

export { userWasSignIn, updateUserData, userWasSignOut };
