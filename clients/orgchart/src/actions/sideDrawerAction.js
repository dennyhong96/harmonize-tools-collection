import { SIDE_DRAWER_OPENED, SIDE_DRAWER_CLOSED } from "./actionTypes";

export const openSideDrawer = () => (dispatch) => {
  dispatch({
    type: SIDE_DRAWER_OPENED,
  });
};

export const closeSideDrawer = () => (dispatch) => {
  dispatch({
    type: SIDE_DRAWER_CLOSED,
  });
};
