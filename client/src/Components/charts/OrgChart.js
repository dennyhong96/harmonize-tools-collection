import React, { Fragment, useState, useEffect, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";
import { connect } from "react-redux";

import ChartIndicator from "./ChartIndicator";
import ChartListPanel from "../charts/ChartListPanel";
import ActionsPanel from "./ActionsPanel";
import "./OrgChart.scss";

const OrgChart = ({ chart, sideDrawer, isEditing }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [chartListShow, setChartListShow] = useState(false);

  const orgChartRef = useRef();
  const orgChartContainer = useRef();

  useEffect(() => {
    orgChartContainer.current = document.querySelector(".orgchart-container");
    orgChartRef.current = document.querySelector(".myChart");
  }, []);

  useEffect(() => {
    if (sideDrawer) {
      orgChartRef.current.classList.add("with-drawer");
      orgChartContainer.current.classList.add("move-right");
    } else {
      orgChartRef.current.classList.remove("with-drawer");
      orgChartContainer.current.classList.remove("move-right");
    }
  }, [sideDrawer]);

  const readSelectedNode = (nodeData) => {
    setSelectedNode(nodeData);
  };

  return (
    <Fragment>
      <ChartIndicator chart={chart} sideDrawer={sideDrawer} />
      <OrganizationChart
        datasource={chart.currentChart}
        chartClass="myChart"
        NodeTemplate={OrgChartNode}
        draggable={!!chart.currentChart.id}
        onClickNode={readSelectedNode}
        collapsible={false}
        pan={!isEditing}
        zoom={true}
      />
      <i class="far fa-arrows-alt"></i>
      <ActionsPanel
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        setChartListShow={setChartListShow}
      />
      <ChartListPanel
        chartListShow={chartListShow}
        setChartListShow={setChartListShow}
        chart={chart}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ chart, sideDrawer, isEditing }) => ({
  chart,
  sideDrawer,
  isEditing,
});

export default connect(mapStateToProps)(OrgChart);
