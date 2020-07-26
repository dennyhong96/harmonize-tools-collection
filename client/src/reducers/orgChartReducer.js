import findNode from "../utils/findNode";
import { v4 as uuidv4 } from "uuid";

import {
  ORG_DATA_FETCHED,
  ORG_DATA_ERROR,
  NODE_MODIFIED,
  NODE_ADDED,
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
      const stateAfterModified = { ...state };
      const selectedNode = findNode(payload.id, stateAfterModified);
      selectedNode.name = name;
      selectedNode.title = title;
      selectedNode.email = email;
      return stateAfterModified;
    case NODE_ADDED:
      const stateAfterAdded = { ...state };
      const parentNode = findNode(payload.id, stateAfterAdded);
      parentNode.children.push({
        ...payload.formData,
        id: uuidv4(),
        children: [],
      });
      return stateAfterAdded;
    default:
      return state;
  }
};
