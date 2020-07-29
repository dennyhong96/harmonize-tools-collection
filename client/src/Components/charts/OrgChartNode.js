import React from "react";
import { Dropdown } from "react-bootstrap";

import "./OrgChartNode.scss";
import userIcon from "../../assets/user-icon.png";

const OrgChartNode = ({ nodeData }) => {
  return (
    <div>
      <div className="oc-inner">
        <Dropdown className="more-options-dropdown">
          <Dropdown.Toggle
            id="dropdown-basic"
            className="more-options-dropdown-btn"
          >
            <i class="fas fa-ellipsis-h"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className="more-options-dropdown-menu">
            <Dropdown.Item as="button">Edit employee</Dropdown.Item>
            <Dropdown.Item as="button">Delete employee</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="user">
          {/* <i class="far fa-user"></i> */}
          <img className="far" src={userIcon} alt="user icon" />
        </div>
        <div className="name">{nodeData.name}</div>
        <div className="title">{nodeData.title}</div>
        <div className="email">{nodeData.email}</div>
        <hr />
        <div className="manager">Manager</div>
        <div className="manager-name">{nodeData.manager}</div>
      </div>
    </div>
  );
};

export default OrgChartNode;
