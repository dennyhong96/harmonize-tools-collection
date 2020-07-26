import React, { Fragment, useRef, useEffect, useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";

import ZoomControl from "./ZoomControl";
import "./OrgChart.scss";

const OrgChart = () => {
  const orgChartRef = useRef(null);
  const orgChartElRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [translateX, setTranslateX] = useState("0");
  const [transformY, setTransformY] = useState("0");

  useEffect(() => {
    // Hook onto orgchart DOM element
    orgChartElRef.current = document.querySelector(".orgchart.myChart");
  }, []);

  useEffect(() => {
    console.log(zoomLevel);
    // Change chart scale when zoom leverl is changed
    const transformValue = orgChartElRef.current.style.transform;
    console.log(transformValue);
    if (transformValue.includes("scale")) {
      orgChartElRef.current.style.transform = transformValue.replace(
        /scale\([0-9\.]+\)/,
        `scale(${zoomLevel})`
      );
      console.log("if");
    } else {
      orgChartElRef.current.style.transform = `scale(${zoomLevel})`;
      console.log("else");
    }
  }, [zoomLevel]);

  useEffect(() => {
    orgChartElRef.current.style.transform = translateX;
  }, [translateX]);

  const handleDownload = () => {
    orgChartRef.current.exportTo("chart", "png");
  };

  const handlePan = () => {
    setTranslateX(
      (prev) => `translateX(${parseFloat(prev.match(/[\-0-9]+/)[0]) + 100}px)`
    );
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
      <ZoomControl setZoomLevel={setZoomLevel} />
      <OrganizationChart
        ref={orgChartRef}
        datasource={ds}
        chartClass="myChart"
        NodeTemplate={OrgChartNode}
        draggable={true}
        // pan={true}
      />
      <button onClick={handleDownload}>Download</button>
      <button onClick={handlePan}>pan</button>
    </Fragment>
  );
};

export default OrgChart;
