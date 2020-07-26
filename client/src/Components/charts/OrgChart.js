import React, { Fragment, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";
import { connect } from "react-redux";

import ZoomControl from "./ZoomControl";
import PanControl from "./PanControl";
import exampleData from "../../utils/exampleData";
import "./OrgChart.scss";

const OrgChart = ({ orgData }) => {
  const orgChartRef = useRef(null);

  const handleDownload = async () => {
    orgChartRef.current.exportTo("chart", "png");
  };

  return (
    <Fragment>
      <ZoomControl />
      <PanControl />
      <OrganizationChart
        ref={orgChartRef}
        datasource={orgData || exampleData}
        chartClass="myChart"
        NodeTemplate={OrgChartNode}
        draggable={true}
      />
      <button onClick={handleDownload}>Download</button>
    </Fragment>
  );
};

const mapStateToProps = ({ orgData }) => ({ orgData });

export default connect(mapStateToProps)(OrgChart);
