import {
  TEMPLATE_DOWNLOADED,
  TEMPLATE_ERROR,
  RESET_TEMPLATE,
} from "../actions/actionTypes";

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case TEMPLATE_DOWNLOADED:
      return true;
    case TEMPLATE_ERROR:
    case RESET_TEMPLATE:
      return false;
    default:
      return state;
  }
};
