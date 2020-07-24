import React, { Fragment, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import OrgChartNode from "./OrgChartNode";
import "./OrgChart.scss";

const OrgChart = ({ orgData }) => {
  // Get reference to the chart DOM node
  const orgChartRef = useRef(null);

  // Download the chart as png
  const handleDownLoadChart = () => {
    orgChartRef.current.exportTo("orgchart", "pdf");
  };

  const ds = {
    id: "n1",
    name: "Lao Lao",
    title: "general manager",
    email: "example@gmail.com",
    children: [
      {
        id: "n2",
        name: "Bo Miao",
        title: "department manager",
        email: "example@gmail.com",
      },
      {
        id: "n3",
        name: "Su Miao",
        title: "department manager",
        children: [
          {
            id: "n4",
            name: "Tie Hua",
            title: "senior engineer",
            email: "example@gmail.com",
          },
          {
            id: "n5",
            name: "Hei Hei",
            title: "senior engineer",
            email: "example@gmail.com",
            children: [
              {
                id: "n6",
                name: "Dan Dan",
                title: "engineer",
                email: "example@gmail.com",
              },
              {
                id: "n7",
                name: "Xiang Xiang",
                title: "engineer",
                email: "example@gmail.com",
              },
            ],
          },
          {
            id: "n8",
            name: "Pang Pang",
            title: "senior engineer",
            email: "example@gmail.com",
          },
        ],
      },
      {
        id: "n9",
        name: "Hong Miao",
        title: "department manager",
        email: "example@gmail.com",
      },
      {
        id: "n10",
        name: "Chun Miao",
        title: "department manager",
        children: [
          {
            id: "n11",
            name: "Yue Yue",
            title: "senior engineer",
            email: "example@gmail.com",
          },
        ],
      },
    ],
  };

  return (
    <Fragment>
      {!orgData && <h1>Example Chart</h1>}
      <OrganizationChart
        datasource={orgData || ds}
        draggable={true}
        collapsible={true}
        ref={orgChartRef}
        pan={true}
        zoom={true}
        chartClass="customOrgChart"
        NodeTemplate={OrgChartNode}
      />
      {orgData && <Button onClick={handleDownLoadChart}>Download Chart</Button>}
    </Fragment>
  );
};

const mapStateToProps = ({ orgData }) => ({ orgData });

export default connect(mapStateToProps)(OrgChart);
