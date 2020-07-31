import { EDITING_STARTED, EDITING_ENDED } from "../actions/actionTypes";

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case EDITING_STARTED:
      return true;
    case EDITING_ENDED:
      return false;
    default:
      return state;
  }
};
