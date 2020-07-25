import React, { Fragment, useRef, useEffect, useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";

import "./OrgChart.scss";

const OrgChart = () => {
  const orgChartRef = useRef(null);
  const orgChartElRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // Hook onto orgchart DOM element
    orgChartElRef.current = document.querySelector(".orgchart.myChart");
  }, []);

  useEffect(() => {
    // Change chart scale when zoom leverl is changed
    orgChartElRef.current.style.transform = `scale(${zoomLevel})`;
  }, [zoomLevel]);

  const zoomIn = () => {
    setZoomLevel((prev) => (prev + 0.1 <= 3 ? prev + 0.2 : 3));
  };

  const zoomInMost = () => {
    setZoomLevel(3);
  };

  const zoomOut = () => {
    setZoomLevel((prev) => (prev - 0.1 >= 0.3 ? prev - 0.2 : 0.3));
  };

  const zoomOutMost = () => {
    setZoomLevel(0.3);
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
      <d className="zoom">
        <button onClick={zoomOutMost}>-</button>
        <button className="zoom-out-btn" onClick={zoomOut}>
          <i class="fas fa-search-minus"></i>
        </button>
        <button className="zoom-in-btn" onClick={zoomIn}>
          <i class="fas fa-search-plus"></i>
        </button>
        <button onClick={zoomInMost}>+</button>
      </d>
      <OrganizationChart
        ref={orgChartRef}
        datasource={ds}
        chartClass="myChart"
        NodeTemplate={OrgChartNode}
        draggable={true}
      />
      <button onClick={() => orgChartRef.current.exportTo("chart", "png")}>
        Download
      </button>
    </Fragment>
  );
};

export default OrgChart;
