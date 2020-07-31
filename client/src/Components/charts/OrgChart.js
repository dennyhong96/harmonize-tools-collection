import React, { Fragment, useState, useEffect, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";
import { connect } from "react-redux";

import ChartListPanel from "../charts/ChartListPanel";
import ActionsPanel from "./ActionsPanel";
import useDownload from "../../hooks/useDownload";
import ZoomControl from "./ZoomControl";
import PanControl from "./PanControl";
import "./OrgChart.scss";

const OrgChart = ({ orgData, sideDrawer }) => {
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
      {/* <ZoomControl />
      <PanControl /> */}

      <OrganizationChart
        datasource={orgData}
        chartClass="myChart"
        NodeTemplate={OrgChartNode}
        draggable={true}
        onClickNode={readSelectedNode}
        collapsible={false}
        pan={true}
        zoom={true}
      />
      <i class="far fa-arrows-alt"></i>
      {/* <div className="download-acitons">
        <button onClick={() => handleDownload("JPG")}>Download JPG</button>
        <button onClick={() => handleDownload("PDF")}>Download PDF</button>
      </div> */}
      <ActionsPanel
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        setChartListShow={setChartListShow}
      />
      <ChartListPanel
        chartListShow={chartListShow}
        setChartListShow={setChartListShow}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ orgData, sideDrawer }) => ({ orgData, sideDrawer });

export default connect(mapStateToProps)(OrgChart);
