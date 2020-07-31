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
  MANAGER_ADDED,
  CHART_LOADED,
  CHART_SAVED,
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
    dispatchToast("Chart rendered!", "SUCCESS");
    return true;
  } catch (error) {
    console.error(error);
    dispatch({
      type: ORG_DATA_ERROR,
    });
    dispatchToast("Something went wrong...");
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
export const addColleague = (id, formData, direction) => (dispatch) => {
  console.log(id, formData, direction);
  dispatch({
    type: COLLEAGUE_ADDED,
    payload: { id, formData, direction },
  });
  dispatchToast(`${formData.name} added!`, "SUCCESS");
};

/**
 * @function addManger
 * Dispath action to modify state according to formData
 * @param {object} formData - formData collected from the form
 */
export const addManager = (formData, selectedNode) => (dispatch) => {
  if (selectedNode.managerId) {
    dispatch({
      type: MANAGER_ADDED,
      payload: {
        formData,
        selectedNode,
      },
    });
  } else {
    dispatch({
      type: NEW_HEAD_ADDED,
      payload: formData,
    });
  }
  dispatchToast(`${formData.name} added as new manager!`, "SUCCESS");
};

/**
 * @function deleteNode
 * Dispath action to modify state according to formData
 * @param {string} id - identifier of the node selected
 * @param {object} formData - formData collected from the form
 */
export const deleteNode = (selectedNode) => (dispatch) => {
  dispatch({
    type: NODE_DELETED,
    payload: selectedNode,
  });
  dispatchToast(`${selectedNode.name} deleted!`, "SUCCESS");
};

export const createChart = (chartName = "default") => async (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { orgData: chartData } = getState();
    const res = await axios.post(
      "/api/v1/charts",
      { chartName, chartData },
      config
    );
    console.log(res.data);

    dispatch({
      type: CHART_SAVED,
      paylod: res.data.data.chart,
    });
  } catch (error) {
    console.error(error);
  }
};
