import React, { useState, Fragment } from "react";
import { Row, Col } from "react-bootstrap";

import EditEmployeeModal from "./EditEmployeeModal";
import "./ChartSelectedEmployee.scss";

const ChartEmployeePanel = ({ selectedNode }) => {
  const [editModalShow, setEditModalShow] = useState(false);
  return (
    <Fragment>
      <Row>
        <Col>
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
        </Col>
        <Col>
          <div className="action">
            <button className="mb-2" onClick={() => setEditModalShow(true)}>
              Edit Employee
            </button>
            <button>Add Employee</button>
          </div>
        </Col>
      </Row>
      <EditEmployeeModal
        selectedNode={selectedNode}
        show={editModalShow}
        setEditModalShow={setEditModalShow}
        onHide={() => setEditModalShow(false)}
      />
    </Fragment>
  );
};

export default ChartEmployeePanel;
