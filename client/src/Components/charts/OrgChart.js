import React, { Fragment, useRef, useEffect, useState } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import OrgChartNode from "./OrgChartNode";

import ZoomControl from "./ZoomControl";
import PanControl from "./PanControl";
import "./OrgChart.scss";

const OrgChart = () => {
  const orgChartRef = useRef(null);
  const orgChartElRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [translateX, setTranslateX] = useState("0");
  const [translateY, setTranslateY] = useState("0");

  useEffect(() => {
    // Hook onto orgchart DOM element
    orgChartElRef.current = document.querySelector(".orgchart.myChart");
  }, []);

  useEffect(() => {
    // Change chart scale when zoom level is changed
    const transformValue = orgChartElRef.current.style.transform;
    if (transformValue.includes("scale")) {
      // Update current scale
      orgChartElRef.current.style.transform = transformValue.replace(
        /scale\([0-9\.]+\)/,
        `scale(${zoomLevel})`
      );
    } else {
      // Append scale into current transform styles
      orgChartElRef.current.style.transform = `${transformValue} scale(${zoomLevel})`;
    }
  }, [zoomLevel]);

  useEffect(() => {
    const transformValue = orgChartElRef.current.style.transform;
    if (transformValue.includes("translateX")) {
      orgChartElRef.current.style.transform = transformValue.replace(
        /translateX\([0-9\.px\-]+\)/,
        translateX
      );
    } else {
      orgChartElRef.current.style.transform = `${transformValue} ${translateX}`;
    }
  }, [translateX]);

  useEffect(() => {
    const transformValue = orgChartElRef.current.style.transform;
    if (transformValue.includes("translateY")) {
      orgChartElRef.current.style.transform = transformValue.replace(
        /translateY\([0-9\.px\-]+\)/,
        translateY
      );
    } else {
      orgChartElRef.current.style.transform = `${transformValue} ${translateY}`;
    }
  }, [translateY]);

  const handleDownload = async () => {
    orgChartRef.current.exportTo("chart", "png");
    // const transformValue = orgChartElRef.current.style.transform;
    // orgChartElRef.current.style.transform = "initial";
    // setTimeout(() => {
    //   orgChartRef.current.exportTo("chart", "png");
    // }, 300);
    // setTimeout(() => {
    //   orgChartElRef.current.style.transform = transformValue;
    // }, 900);
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
      <PanControl setTranslateX={setTranslateX} setTranslateY={setTranslateY} />
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
