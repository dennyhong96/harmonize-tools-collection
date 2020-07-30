import axios from "axios";

import { USER_LOADED, AUTH_ERROR, USER_LOGOUT } from "./actionTypes";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/auth/user");
    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/auth/logout");
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    console.error(error);
  }
};
