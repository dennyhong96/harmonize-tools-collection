import React, { Fragment, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";

import ZoomControl from "./ZoomControl";
import PanControl from "./PanControl";
import "./OrgChart.scss";

const OrgChart = () => {
  const orgChartRef = useRef(null);

  const handleDownload = async () => {
    orgChartRef.current.exportTo("chart", "png");
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
        email: "example@gmail.com",
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
        email: "example@gmail.com",
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
      <ZoomControl />
      <PanControl />
      <OrganizationChart
        ref={orgChartRef}
        datasource={ds}
        chartClass="myChart"
        NodeTemplate={OrgChartNode}
        draggable={true}
      />
      <button onClick={handleDownload}>Download</button>
    </Fragment>
  );
};

export default OrgChart;
