import { TEMPLATE_DOWNLOADED, TEMPLATE_ERROR } from "../actions/actionTypes";

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case TEMPLATE_DOWNLOADED:
      return true;
    case TEMPLATE_ERROR:
      return false;
    default:
      state;
  }
};
