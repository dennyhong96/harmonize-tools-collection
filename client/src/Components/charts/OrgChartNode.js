import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";

import { startEditing, endEditing } from "../../actions/editingActions";
import EditEmployeeModal from "./EditEmployeeModal";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import AddEmployeeModal from "./AddEmployeeModal";
import {
  deleteNode,
  collapseNode,
  expandNode,
} from "../../actions/orgChartActions";
import "./OrgChartNode.scss";
import userIcon from "../../assets/user-icon.png";

const OrgChartNode = ({
  chart,
  nodeData,
  deleteNode,
  collapseNode,
  startEditing,
  endEditing,
  expandNode,
}) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [deletePopupShow, setDeletePopupShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addMode, setAddMode] = useState("DIRECT_REPORT");

  const handleDelete = () => {
    deleteNode(nodeData);
    setDeletePopupShow(false);
  };

  useEffect(() => {
    if (editModalShow || addModalShow || deletePopupShow) {
      startEditing();
    } else {
      endEditing();
    }
  }, [editModalShow, addModalShow, deletePopupShow]);

  return (
    <div>
      <div className="oc-inner">
        {nodeData.children.length ? (
          <button
            onClick={() => {
              console.log(nodeData);
              collapseNode(nodeData.id);
            }}
          >
            collapse
          </button>
        ) : null}
        {chart.isCollapsed &&
        chart.collapsedCharts
          .map((chart) => chart.collapsedNodeId)
          .includes(nodeData.id) ? (
          <button onClick={expandNode}>Expand</button>
        ) : null}
        {!chart.isCollapsed && nodeData.id && (
          <div
            className="onclick-add add-top"
            onClick={() => {
              setAddMode("HEAD");
              setAddModalShow(true);
            }}
          >
            <i className="fas fa-plus"></i>
          </div>
        )}
        {!chart.isCollapsed && nodeData.id && (
          <div
            className="onclick-add add-bottom"
            onClick={() => {
              setAddMode("DIRECT_REPORT");
              setAddModalShow(true);
            }}
          >
            <i className="fas fa-plus"></i>
          </div>
        )}
        {!chart.isCollapsed && nodeData.manager && (
          <div
            className="onclick-add add-left"
            onClick={() => {
              setAddMode("COLLEAGUE_LFET");
              setAddModalShow(true);
            }}
          >
            <i className="fas fa-plus"></i>
          </div>
        )}
        {!chart.isCollapsed && nodeData.manager && (
          <div
            className="onclick-add add-right"
            onClick={() => {
              setAddMode("COLLEAGUE_RIGHT");
              setAddModalShow(true);
            }}
          >
            <i className="fas fa-plus"></i>
          </div>
        )}
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
            {nodeData.id && (
              <Dropdown.Item
                as="button"
                onClick={() => setDeletePopupShow(true)}
              >
                Delete employee
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <div className="user">
          <img className="far" src={userIcon} alt="user icon" />
        </div>
        <div className="name">{nodeData.name}</div>
        <div className="title">{nodeData.title}</div>
        <div className="email">{nodeData.email}</div>
        <hr />
        <div className="manager">Manager</div>
        <div className="manager-name">{nodeData.manager || "-"}</div>
      </div>
      <EditEmployeeModal
        selectedNode={nodeData}
        show={editModalShow}
        setEditModalShow={setEditModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <AddEmployeeModal
        selectedNode={nodeData}
        show={addModalShow}
        setAddModalShow={setAddModalShow}
        onHide={() => setAddModalShow(false)}
        addMode={addMode}
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

const mapStateToProps = ({ chart }) => ({ chart });

export default connect(mapStateToProps, {
  deleteNode,
  collapseNode,
  expandNode,
  startEditing,
  endEditing,
})(OrgChartNode);
