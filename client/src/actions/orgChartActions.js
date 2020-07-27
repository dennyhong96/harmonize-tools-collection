import axios from "axios";
import dispatchToast from "../utils/toast";

import {
  ORG_DATA_FETCHED,
  ORG_DATA_ERROR,
  NODE_MODIFIED,
  NODE_ADDED,
  COLLEAGUE_ADDED,
  NEW_HEAD_ADDED,
  NODE_DELETED,
} from "./actionTypes";

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
    console.error(error);
    dispatch({
      type: ORG_DATA_ERROR,
    });
    return false;
  }
};

/**
 * @function updateNode
 * Dispath action to modify state according to formData
 * @param {string} id - identifier of the node selected
 * @param {object} formData - formData collected from the form
 */
export const updateNode = (id, formData) => (dispatch) => {
  dispatch({
    type: NODE_MODIFIED,
    payload: { id, formData },
  });
  dispatchToast(`${formData.name} updated!`, "SUCCESS");
};

/**
 * @function addNode
 * Dispath action to modify state according to formData
 * @param {string} id - identifier of the node selected
 * @param {object} formData - formData collected from the form
 */
export const addNode = (id, formData) => (dispatch) => {
  dispatch({
    type: NODE_ADDED,
    payload: { id, formData },
  });
  dispatchToast(`${formData.name} added!`, "SUCCESS");
};

/**
 * @function addColleague
 * Dispath action to modify state according to formData
 * @param {string} id - identifier of the node selected
 * @param {object} formData - formData collected from the form
 */
export const addColleague = (id, formData) => (dispatch) => {
  dispatch({
    type: COLLEAGUE_ADDED,
    payload: { id, formData },
  });
  dispatchToast(`${formData.name} added!`, "SUCCESS");
};

/**
 * @function addNewHead
 * Dispath action to modify state according to formData
 * @param {object} formData - formData collected from the form
 */
export const addNewHead = (formData) => (dispatch) => {
  dispatch({
    type: NEW_HEAD_ADDED,
    payload: formData,
  });
  dispatchToast(`${formData.name} added as new root!`, "SUCCESS");
};

/**
 * @function deleteNode
 * Dispath action to modify state according to formData
 * @param {string} id - identifier of the node selected
 * @param {object} formData - formData collected from the form
 */
export const deleteNode = (selectedNode) => (dispatch) => {
  console.log(selectedNode);
  dispatch({
    type: NODE_DELETED,
    payload: selectedNode.id,
  });
  dispatchToast(`${selectedNode.name} deleted!`, "SUCCESS");
};
