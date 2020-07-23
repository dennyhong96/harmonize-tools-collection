import axios from "axios";
import fileDownload from "js-file-download";

import { TEMPLATE_DOWNLOADED, TEMPLATE_ERROR } from "./actionTypes";

export const getTemplate = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/csv");
    fileDownload(res.data, "template.csv");
    dispatch({
      type: TEMPLATE_DOWNLOADED,
    });
  } catch (error) {
    console.error(error);
  }
};
