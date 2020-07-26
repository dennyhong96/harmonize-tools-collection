import findNode from "../utils/findNode";
import { v4 as uuidv4 } from "uuid";

import {
  ORG_DATA_FETCHED,
  ORG_DATA_ERROR,
  NODE_MODIFIED,
  NODE_ADDED,
} from "../actions/actionTypes";
import exampleData from "../utils/exampleData";

const INITIAL_STATE = exampleData;

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
      console.log(payload.id, stateAfterAdded);
      parentNode.children.push({
        ...payload.formData,
        id: `oc-${uuidv4()}`, // html el id must start with letter
        children: [],
        manager: parentNode.name,
      });
      return stateAfterAdded;
    default:
      return state;
  }
};
