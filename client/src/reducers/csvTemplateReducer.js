import {
  TEMPLATE_DOWNLOADED,
  TEMPLATE_ERROR,
  RESET_TEMPLATE,
  TEMPLATE_ERROR_CLEARED,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  isDownloaded: false,
  csvErrorMsg: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TEMPLATE_DOWNLOADED:
      return { ...state, isDownloaded: true };
    case RESET_TEMPLATE:
      return { ...state, isDownloaded: false };
    case TEMPLATE_ERROR:
      return { ...state, isDownloaded: false, csvErrorMsg: payload };
    case TEMPLATE_ERROR_CLEARED:
      return { ...state, csvErrorMsg: null };
    default:
      return state;
  }
};
