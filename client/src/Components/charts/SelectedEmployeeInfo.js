import React from "react";

import "./SelectedEmployeeInfo.scss";

const SelectedEmployeeInfo = ({ selectedNode }) => {
  return (
    <div className="selected-employee">
      <h6>Selected Employee:</h6>
      {selectedNode && (
        <div className="employee-info">
          <p>
            <strong>Name: </strong>
            {selectedNode.name}
          </p>
          <p>
            <strong>Title: </strong>
            {selectedNode.title}
          </p>
          <p>
            <strong>Email: </strong>
            {selectedNode.email}
          </p>
          <p>
            <strong>Manager: </strong>
            {selectedNode.manager}
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectedEmployeeInfo;
