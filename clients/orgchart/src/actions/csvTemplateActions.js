import axios from "axios";
import fileDownload from "js-file-download";

import {
  TEMPLATE_DOWNLOADED,
  TEMPLATE_ERROR,
  RESET_TEMPLATE,
  TEMPLATE_ERROR_CLEARED,
} from "./actionTypes";
import { setStep } from "../actions/stepActions";

/**
 * @function getTemplate
 * Downloads csv template from server
 */
export const getTemplate = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/csv");
    fileDownload(res.data, "Harmonize_Org_Chart_Template.csv");
    dispatch({
      type: TEMPLATE_DOWNLOADED,
    });
    dispatch(setStep(2));
    return true;
  } catch (error) {
    console.error(error);
    dispatch({
      type: TEMPLATE_ERROR,
    });
    return false;
  }
};

/**
 * @function
 * Reset the template piece of state
 */
export const resetTemplate = () => (dispatch) => {
  dispatch({
    type: RESET_TEMPLATE,
  });
};

export const clearCsvError = () => (dispatch) => {
  dispatch({
    type: TEMPLATE_ERROR_CLEARED,
  });
};
