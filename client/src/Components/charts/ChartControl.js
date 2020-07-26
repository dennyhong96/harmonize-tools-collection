import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

import SelectedEmployeeInfo from "./SelectedEmployeeInfo";
import ChartSelectedEmployee from "./ChartSelectedEmployee";

import "./ChartControl.scss";

const ChartControl = ({ selectedNode, setSelectedNode }) => {
  return (
    <div className="chart-control">
      <Row>
        <Col>
          <SelectedEmployeeInfo selectedNode={selectedNode} />
        </Col>
        <Col>
          <ChartSelectedEmployee
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChartControl;
