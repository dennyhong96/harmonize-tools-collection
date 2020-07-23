import axios from "axios";
import fileDownload from "js-file-download";

import { TEMPLATE_DOWNLOADED, TEMPLATE_ERROR } from "./actionTypes";

/**
 * @function getTemplate
 * Downloads csv template from server
 */
export const getTemplate = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/csv");
    fileDownload(res.data, "template.csv");
    dispatch({
      type: TEMPLATE_DOWNLOADED,
    });
    return true;
  } catch (error) {
    console.error(error);
    dispatch({
      type: TEMPLATE_ERROR,
    });
    return false;
  }
};
