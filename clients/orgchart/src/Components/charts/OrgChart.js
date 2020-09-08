import React, { Fragment, useState, useEffect, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";
import { connect } from "react-redux";

import { extractLocalChart } from "../../actions/orgChartActions";
import ChartIndicator from "./ChartIndicator";
import CollapseWarning from "./CollapseWarning";
import ChartListPanel from "../charts/ChartListPanel";
import ActionsPanel from "./ActionsPanel";
import "./OrgChart.scss";

const OrgChart = ({
  chart,
  sideDrawer,
  isEditing,
  extractLocalChart,
  user,
}) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [chartListShow, setChartListShow] = useState(false);

  const orgChartRef = useRef();
  const orgChartContainer = useRef();

  useEffect(() => {
    orgChartContainer.current = document.querySelector(".orgchart-container");
    orgChartRef.current = document.querySelector(".myChart");
    extractLocalChart();
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
      <CollapseWarning chart={chart} sideDrawer={sideDrawer} />
      <OrganizationChart
        datasource={chart.collapsedChart || chart.currentChart}
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
        user={user}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ chart, sideDrawer, isEditing, user }) => ({
  chart,
  sideDrawer,
  isEditing,
  user,
});

export default connect(mapStateToProps, { extractLocalChart })(OrgChart);
