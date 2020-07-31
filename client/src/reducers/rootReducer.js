import { combineReducers } from "redux";

import template from "./csvTemplateReducer";
import chart from "./orgChartReducer";
import sideDrawer from "./sideDrawerReducer";
import user from "./userReducer";

export default combineReducers({ template, chart, sideDrawer, user });
