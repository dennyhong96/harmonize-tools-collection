import React, { Fragment, useState, useEffect, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";
import { connect } from "react-redux";

import ChartControl from "./ChartControl";
import ZoomControl from "./ZoomControl";
import PanControl from "./PanControl";
import "./OrgChart.scss";

const OrgChart = ({ orgData, sideDrawer }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const orgCharatContainerRef = useRef();
  useEffect(() => {
    orgCharatContainerRef.current = document.querySelector(
      ".orgchart-container"
    );
    console.log(orgCharatContainerRef.current);
  }, []);

  useEffect(() => {
    if (sideDrawer) {
      orgCharatContainerRef.current.classList.add("move-right");
    } else {
      orgCharatContainerRef.current.classList.remove("move-right");
    }
  }, [sideDrawer]);

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

const mapStateToProps = ({ orgData, sideDrawer }) => ({ orgData, sideDrawer });

export default connect(mapStateToProps)(OrgChart);
