import React from "react";
import { connect } from "react-redux";

import "./EmployeeInfoPanel.scss";

const EmployeeInfoPanel = ({ sideDrawer, user }) => {
  return (
    <div
      className={`employee-card ${
        !sideDrawer && user ? "employee-card-show" : ""
      }`}
    >
      <div className="employee-card-close">
        <i className="fas fa-times"></i>
      </div>
      <div className="selected-employee">
        {user && <p className="name">{user.name}'s Chart</p>}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer, user }) => ({ sideDrawer, user });

export default connect(mapStateToProps)(EmployeeInfoPanel);
