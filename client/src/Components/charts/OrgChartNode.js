import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";

import EditEmployeeModal from "./EditEmployeeModal";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { deleteNode } from "../../actions/orgChartActions";
import "./OrgChartNode.scss";
import userIcon from "../../assets/user-icon.png";

const OrgChartNode = ({ nodeData, deleteNode }) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [deletePopupShow, setDeletePopupShow] = useState(false);

  const handleDelete = () => {
    deleteNode(nodeData);
    setDeletePopupShow(false);
  };

  return (
    <div>
      <div className="oc-inner">
        <div className="onclick-add add-top">
          <i className="fas fa-plus"></i>
        </div>
        <div className="onclick-add add-bottom">
          <i className="fas fa-plus"></i>
        </div>
        <div className="onclick-add add-left">
          <i className="fas fa-plus"></i>
        </div>
        <div className="onclick-add add-right">
          <i className="fas fa-plus"></i>
        </div>
        <Dropdown className="more-options-dropdown">
          <Dropdown.Toggle
            id="dropdown-basic"
            className="more-options-dropdown-btn"
          >
            <i class="fas fa-ellipsis-h"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className="more-options-dropdown-menu">
            <Dropdown.Item as="button" onClick={() => setEditModalShow(true)}>
              Edit employee
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setDeletePopupShow(true)}>
              Delete employee
            </Dropdown.Item>
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
      <EditEmployeeModal
        selectedNode={nodeData}
        show={editModalShow}
        setEditModalShow={setEditModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <ConfirmDeletePopup
        deletePopupShow={deletePopupShow}
        handleDelete={handleDelete}
        onHide={() => setDeletePopupShow(false)}
        selectedNode={nodeData}
      />
    </div>
  );
};

export default connect(null, { deleteNode })(OrgChartNode);
