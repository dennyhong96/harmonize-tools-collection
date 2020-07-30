import React from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

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
        {user && <p className="name">Welcome, {user.name}</p>}
      </div>
      <ListGroup className="action-list">
        <ListGroup.Item className="action-item" as="button" action>
          <i class="far fa-save"></i> Save your chart
        </ListGroup.Item>
        <ListGroup.Item className="action-item" as="button" action>
          <i class="fas fa-download"></i> Load your chart
        </ListGroup.Item>
        <ListGroup.Item className="action-item" as="button" action>
          <i class="far fa-file-pdf"></i> Export PDF
        </ListGroup.Item>
        <ListGroup.Item className="action-item" as="button" action>
          <i class="far fa-file-image"></i> Export JPG
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer, user }) => ({ sideDrawer, user });

export default connect(mapStateToProps)(EmployeeInfoPanel);
