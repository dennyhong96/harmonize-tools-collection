import { SIDE_DRAWER_OPENED, SIDE_DRAWER_CLOSED } from "../actions/actionTypes";

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case SIDE_DRAWER_OPENED:
      return true;
    case SIDE_DRAWER_CLOSED:
      return false;
    default:
      return state;
  }
};
