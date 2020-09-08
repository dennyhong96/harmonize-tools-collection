import { LOADING_CLOSED, LOADING_OPEN } from "./actionTypes";

export const openLoading = () => (dispatch) => {
  localStorage.setItem("CANCEL_GUIDE", "TRUE");
  dispatch({
    type: LOADING_OPEN,
  });
};
export const closeLoading = () => (dispatch) => {
  localStorage.setItem("CANCEL_GUIDE", "TRUE");
  dispatch({
    type: LOADING_CLOSED,
  });
};
