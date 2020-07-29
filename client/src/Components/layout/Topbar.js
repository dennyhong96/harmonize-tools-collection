import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  openSideDrawer,
  closeSideDrawer,
} from "../../actions/sideDrawerAction";
import "./Topbar.scss";

const topbar = ({ sideDrawer, closeSideDrawer, openSideDrawer }) => {
  const toggleSideDrawer = () => {
    if (sideDrawer) {
      return closeSideDrawer();
    }
    return openSideDrawer();
  };

  return (
    <div className="topbar">
      <div
        className={`toggler-btn ${sideDrawer ? "opened" : ""}`}
        onClick={toggleSideDrawer}
      >
        <i className="fas fa-chevron-right"></i>
      </div>
      <h1 className="heading">ORGANIZATIONAL CHART TOOL</h1>
      <Link to="/">HOME</Link>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer }) => ({ sideDrawer });

export default connect(mapStateToProps, { openSideDrawer, closeSideDrawer })(
  topbar
);
