import axios from "axios";

import { ORG_DATA_FETCHED, ORG_DATA_ERROR, NODE_MODIFIED } from "./actionTypes";

/**
 * @param {object} file - csv file to be uploaded to server
 * Uploads user modified csv file to server
 */
export const uploadOrgData = (file) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("csv", file);
  try {
    const res = await axios.post("/api/v1/csv", formData, config);
    dispatch({
      type: ORG_DATA_FETCHED,
      payload: res.data.data,
    });
    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORG_DATA_ERROR,
    });
    return false;
  }
};

/**
 * @function updateNode
 * Dispath action to modify state according to formData
 * @param {object} formData - formData collected from the form
 */
export const updateNode = (formData) => (dispatch) => {
  dispatch({
    type: NODE_MODIFIED,
    payload: formData,
  });
};
