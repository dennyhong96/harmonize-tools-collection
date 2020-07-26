import React, { Fragment, useRef, useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";
import { connect } from "react-redux";

import ChartControl from "./ChartControl";
import ZoomControl from "./ZoomControl";
import PanControl from "./PanControl";
import "./OrgChart.scss";

const OrgChart = ({ orgData }) => {
  const orgChartRef = useRef(null);

  const [selectedNode, setSelectedNode] = useState(null);

  const readSelectedNode = (nodeData) => {
    setSelectedNode(nodeData);
  };

  return (
    <Fragment>
      <ZoomControl />
      <PanControl />
      <OrganizationChart
        ref={orgChartRef}
        datasource={orgData}
        chartClass="myChart"
        NodeTemplate={OrgChartNode}
        draggable={true}
        onClickNode={readSelectedNode}
      />
      {/* <button onClick={handleDownload}>Download</button> */}
      <ChartControl
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ orgData }) => ({ orgData });

export default connect(mapStateToProps)(OrgChart);
