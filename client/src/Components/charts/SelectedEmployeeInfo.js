import React from "react";
import { Row, Col } from "react-bootstrap";

import "./SelectedEmployeeInfo.scss";

const SelectedEmployeeInfo = ({ selectedNode }) => {
  return (
    <div className="selected-employee">
      <h6>SELECTED EMPLOYEE</h6>

      {selectedNode && (
        <div className="employee-info">
          <Row>
            <Col>
              <p>
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
              </p>
            </Col>
            <Col>
              <p>
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
              </p>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default SelectedEmployeeInfo;
