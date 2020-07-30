import { combineReducers } from "redux";

import template from "./csvTemplateReducer";
import orgData from "./orgChartReducer";
import sideDrawer from "./sideDrawerReducer";
import user from "./userReducer";

export default combineReducers({ template, orgData, sideDrawer, user });
