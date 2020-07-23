import { combineReducers } from "redux";

import template from "./csvTemplateReducer";
import orgData from "./orgChartReducer";

export default combineReducers({ template, orgData });
