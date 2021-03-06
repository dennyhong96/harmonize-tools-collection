import axios from "axios";

import { USER_LOADED, AUTH_ERROR, USER_LOGOUT } from "./actionTypes";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/auth/user");
    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    });
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};

export const loadJwtUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/auth");
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
    await axios.get("/api/v1/auth/logout");
    localStorage.removeItem("JWT_TOKEN");
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    console.error(error);
  }
};

export const login = () => (dispatch, getState) => {
  localStorage.setItem("chart", JSON.stringify(getState().chart.currentChart));

  window.location =
    process.env.NODE_ENV === "production"
      ? "/api/v1/auth/twitter"
      : "http://localhost:5000/api/v1/auth/twitter";
};
