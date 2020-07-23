import { ORG_DATA_FETCHED, ORG_DATA_ERROR } from "../reducers/orgChartReducer";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  const [type, payload] = action;
  switch (type) {
    case ORG_DATA_FETCHED:
      return payload;
    case ORG_DATA_ERROR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
