import { EDITING_STARTED, EDITING_ENDED } from "../actions/actionTypes";

export const startEditing = () => (dispatch) => {
  dispatch({
    type: EDITING_STARTED,
  });
};

export const endEditing = () => (dispatch) => {
  dispatch({
    type: EDITING_ENDED,
  });
};
