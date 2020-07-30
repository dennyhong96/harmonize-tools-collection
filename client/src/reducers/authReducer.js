import { USER_LOADED, AUTH_ERROR } from "../actions/actionTypes";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return payload;
    default:
      return state;
  }
};
