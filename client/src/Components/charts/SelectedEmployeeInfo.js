import React from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import "./SelectedEmployeeInfo.scss";

const SelectedEmployeeInfo = ({ selectedNode, sideDrawer }) => {
  return (
    <div className={`selected-employee ${sideDrawer ? "hide-panel" : ""}`}>
      <h6>SELECTED EMPLOYEE</h6>
      <div className="employee-info">
        {selectedNode ? (
          <Row noGutters>
            <Col xs={{ span: 5 }}>
              <Row noGutters>
                <Col xs={{ span: 3 }}>
                  <strong>NAME: </strong>
                </Col>
                <Col xs={{ span: 9 }}>
                  <span>{selectedNode.name}</span>
                </Col>
              </Row>
              <Row noGutters>
                <Col xs={{ span: 3 }}>
                  <strong>TITLE: </strong>
                </Col>
                <Col xs={{ span: 9 }}>
                  <span>{selectedNode.title}</span>
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 7 }}>
              <Row noGutters>
                <Col xs={{ span: 3 }}>
                  <strong>EMAIL: </strong>
                </Col>
                <Col xs={{ span: 9 }}>
                  <span>{selectedNode.email}</span>
                </Col>
              </Row>
              <Row noGutters>
                <Col xs={{ span: 3 }}>
                  <strong>MANAGER: </strong>
                </Col>
                <Col xs={{ span: 9 }}>
                  <span>{selectedNode.manager}</span>
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

const mapStateToProps = ({ sideDrawer }) => ({ sideDrawer });

export default connect(mapStateToProps)(SelectedEmployeeInfo);
