import React from "react";
import "./OrgChartNode.scss";

import userIcon from "../../assets/user-icon.png";

const OrgChartNode = ({ nodeData }) => {
  return (
    <div>
      <div className="oc-inner">
        <div className="user">
          {/* <i class="far fa-user"></i> */}
          <img className="far" src={userIcon} alt="user icon" />
        </div>
        <div className="name">{nodeData.name}</div>
        <div className="title">{nodeData.title}</div>
        <div className="email">{nodeData.email}</div>
        <hr />
        <div className="manager">Manger</div>
        <div className="manager-name">{nodeData.manager}</div>
      </div>
    </div>
  );
};

export default OrgChartNode;
