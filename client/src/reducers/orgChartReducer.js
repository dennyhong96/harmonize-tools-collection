import findNode from "../utils/findNode";

import {
  ORG_DATA_FETCHED,
  ORG_DATA_ERROR,
  NODE_MODIFIED,
} from "../actions/actionTypes";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORG_DATA_FETCHED:
      return payload;
    case ORG_DATA_ERROR:
      return INITIAL_STATE;
    case NODE_MODIFIED:
      const { name, title, email } = payload.formData;
      console.log(name, title, email);
      const newState = { ...state };
      console.log(newState);
      const node = findNode(payload.id, newState);
      console.log(node);
      node.name = name;
      node.title = title;
      node.email = email;
      return newState;
    default:
      return state;
  }
};
