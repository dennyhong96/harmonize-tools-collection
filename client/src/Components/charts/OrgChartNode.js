import React from "react";

import "./OrgChartNode.scss";

const OrgChartNode = ({ nodeData }) => {
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.name + ". I'm a " + nodeData.title + ".");
  };
  return (
    <div onClick={selectNode}>
      <div className="position">{nodeData.title}</div>
      <div className="position">{nodeData.email}</div>
      <div className="fullname">{nodeData.name}</div>
    </div>
  );
};

export default OrgChartNode;
