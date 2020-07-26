import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

import ChartSelectedEmployee from "./ChartSelectedEmployee";
import "./ChartControl.scss";

const ChartControl = ({ selectedNode }) => {
  return (
    <div className="chart-control">
      <Row>
        <Col>
          <ChartSelectedEmployee selectedNode={selectedNode} />
        </Col>
        <Col>2</Col>
        <Col>3</Col>
      </Row>
    </div>
  );
};

export default ChartControl;
