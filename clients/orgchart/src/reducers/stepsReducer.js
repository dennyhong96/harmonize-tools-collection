import { STEP_SET } from "../actions/actionTypes";

const INITIAL_STATE = 1;

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case STEP_SET:
      return payload;
    default:
      return state;
  }
};
