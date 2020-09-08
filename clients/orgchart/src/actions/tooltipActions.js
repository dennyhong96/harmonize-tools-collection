import { TOOLTIP_OPEN, TOOLTIP_CLOSE, TOOLTIP_STEP_SET } from "./actionTypes";

export const openToolTips = () => (dispatch) => {
  dispatch({
    type: TOOLTIP_OPEN,
  });
};

export const closeToolTips = () => (dispatch) => {
  localStorage.setItem("isGuided", "true");
  dispatch({
    type: TOOLTIP_CLOSE,
  });
};

export const setToolTipSteps = (step) => (dispatch) => {
  dispatch({
    type: TOOLTIP_STEP_SET,
    payload: step,
  });
};
