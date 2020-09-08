import { LOADING_OPEN, LOADING_CLOSED } from "../actions/actionTypes";

const INITIAL_STATE = true;

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case LOADING_OPEN:
      return true;
    case LOADING_CLOSED:
      return false;
    default:
      return state;
  }
};
