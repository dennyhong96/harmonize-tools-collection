import { combineReducers } from "redux";

import template from "./csvTemplateReducer";
import chart from "./orgChartReducer";
import sideDrawer from "./sideDrawerReducer";
import user from "./userReducer";
import isEditing from "./editingReducer";

export default combineReducers({
  template,
  chart,
  sideDrawer,
  user,
  isEditing,
});
