import { combineReducers } from "redux";

import template from "./csvTemplateReducer";
import orgData from "./orgChartReducer";
import sideDrawer from "./sideDrawerReducer";

export default combineReducers({ template, orgData, sideDrawer });
