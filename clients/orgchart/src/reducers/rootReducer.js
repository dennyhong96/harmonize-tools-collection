import { combineReducers } from "redux";

import template from "./csvTemplateReducer";
import chart from "./orgChartReducer";
import sideDrawer from "./sideDrawerReducer";
import user from "./userReducer";
import isEditing from "./editingReducer";
import step from "./stepsReducer";
import tooltip from "./tooltipReducer";
import loading from "./loadingReducer";

export default combineReducers({
  template,
  chart,
  sideDrawer,
  user,
  isEditing,
  step,
  tooltip,
  loading,
});
