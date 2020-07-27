import React, { Fragment, useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";
import { connect } from "react-redux";

import ChartControl from "./ChartControl";
import ZoomControl from "./ZoomControl";
import PanControl from "./PanControl";
import "./OrgChart.scss";

const OrgChart = ({ orgData }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const readSelectedNode = (nodeData) => {
    setSelectedNode(nodeData);
  };

  return (
    <Fragment>
      <ZoomControl />
      <PanControl />
      <OrganizationChart
        datasource={orgData}
        chartClass="myChart"
        NodeTemplate={OrgChartNode}
        draggable={true}
        onClickNode={readSelectedNode}
      />
      <ChartControl
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ orgData }) => ({ orgData });

export default connect(mapStateToProps)(OrgChart);
