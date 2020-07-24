import React from "react";

import "./OrgChartNode.scss";

const OrgChartNode = ({ nodeData }) => {
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.name + ". I'm a " + nodeData.title + ".");
  };
  return (
    <div onClick={selectNode}>
      <div className="oc-node-inner">
        <div className="profile-card">
          <i class="far fa-user"></i>
        </div>
        <p className="name">{nodeData.title}</p>
        <p className="email">{nodeData.email}</p>
        <hr />
        <p className="manager">Team Manager</p>
        <p className="manager-name">Amy Adams</p>
      </div>
      {/* <div className="position">{nodeData.email}</div>
      <div className="fullname">{nodeData.name}</div> */}
    </div>
  );
};

export default OrgChartNode;
