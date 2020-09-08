import { STEP_SET } from "./actionTypes";

export const setStep = (step) => (dispatch) => {
  dispatch({
    type: STEP_SET,
    payload: step,
  });
};
