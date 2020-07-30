import React from "react";
import { connect } from "react-redux";

import "./EmployeeInfoPanel.scss";

const EmployeeInfoPanel = ({ selectedNode, setSelectedNode, sideDrawer }) => {
  return (
    <div
      className={`employee-card ${
        !sideDrawer && selectedNode ? "employee-card-show" : ""
      }`}
    >
      <div
        className="employee-card-close"
        onClick={() => setSelectedNode(null)}
      >
        <i className="fas fa-times"></i>
      </div>
      <div className="selected-employee">
        <h6>{selectedNode && selectedNode.name}</h6>
      </div>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer }) => ({ sideDrawer });

export default connect(mapStateToProps)(EmployeeInfoPanel);
