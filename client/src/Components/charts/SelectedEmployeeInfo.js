import React from "react";
import { Row, Col } from "react-bootstrap";

import "./SelectedEmployeeInfo.scss";

const SelectedEmployeeInfo = ({ selectedNode }) => {
  return (
    <div className="selected-employee">
      <h6>SELECTED EMPLOYEE</h6>
      <div className="employee-info">
        {selectedNode ? (
          <Row>
            <Col>
              <Row>
                <Col xs={{ span: 3 }}>
                  <strong>NAME: </strong>
                </Col>
                <Col xs={{ span: 9 }}>
                  <span>{selectedNode.name}</span>
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 3 }}>
                  <strong>TITLE: </strong>
                </Col>
                <Col xs={{ span: 9 }}>
                  <span>{selectedNode.title}</span>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col xs={{ span: 3 }}>
                  <strong>EMAIL: </strong>
                </Col>
                <Col xs={{ span: 9 }}>
                  <span>{selectedNode.email}</span>
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 3 }}>
                  <strong>MANAGER: </strong>
                </Col>
                <Col xs={{ span: 9 }}>
                  <span>{selectedNode.title}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <p className="none-selected">
            Select an employee to start exploring!
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectedEmployeeInfo;
