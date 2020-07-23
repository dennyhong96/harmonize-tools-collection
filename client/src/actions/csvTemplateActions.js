import axios from "axios";

import { TEMPLATE_DOWNLOADED, TEMPLATE_ERROR } from "./actionTypes";

export const getTemplate = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/csv");
  } catch (error) {
    console.error(error);
  }
};
