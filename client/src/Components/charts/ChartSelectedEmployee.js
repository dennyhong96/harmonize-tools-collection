import React, { useState, Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { deleteNode } from "../../actions/orgChartActions";
import EditEmployeeModal from "./EditEmployeeModal";
import AddEmployeeModal from "./AddEmployeeModal";
import "./ChartSelectedEmployee.scss";

const ChartEmployeePanel = ({ selectedNode, deleteNode }) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addMode, setAddMode] = useState("DIRECT_REPORT");

  const handleDelete = () => {
    deleteNode(selectedNode.id);
  };

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
            <button
              className="mb-2"
              onClick={() => {
                setAddMode("DIRECT_REPORT");
                setAddModalShow(true);
              }}
            >
              Add Employee
            </button>
            <button
              className="mb-2"
              onClick={() => {
                setAddMode("COLLEAGUE");
                setAddModalShow(true);
              }}
            >
              Add Colleague
            </button>
            <button
              className="mb-2"
              onClick={() => {
                setAddMode("HEAD");
                setAddModalShow(true);
              }}
            >
              Add New Head
            </button>
            <button onClick={handleDelete}>Delete Employee</button>
          </div>
        </Col>
      </Row>
      <EditEmployeeModal
        selectedNode={selectedNode}
        show={editModalShow}
        setEditModalShow={setEditModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <AddEmployeeModal
        selectedNode={selectedNode}
        show={addModalShow}
        setAddModalShow={setAddModalShow}
        onHide={() => setAddModalShow(false)}
        addMode={addMode}
      />
    </Fragment>
  );
};

export default connect(null, { deleteNode })(ChartEmployeePanel);
