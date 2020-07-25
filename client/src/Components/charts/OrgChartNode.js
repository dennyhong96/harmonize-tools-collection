import React from "react";
import PropTypes from "prop-types";
import "./OrgChartNode.scss";

const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

const MyNode = ({ nodeData }) => {
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.name + ". I'm a " + nodeData.title + ".");
  };

  return (
    <div onClick={selectNode}>
      <div className="oc-inner">
        <div className="user">
          <i class="far fa-user"></i>
        </div>
        <div className="name">{nodeData.name}</div>
        <div className="email">{nodeData.email}</div>
        <hr />
        <div className="manager">{"Team Manger"}</div>
        <div className="manager-name">{"Sam Wang"}</div>
      </div>
    </div>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;
