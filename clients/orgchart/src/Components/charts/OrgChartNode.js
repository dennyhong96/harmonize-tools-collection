import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";

import ToolTip from "../widgets/ToolTip";
import ManualToggleToolTip from "../widgets/ManualToggleToolTip";
import { startEditing, endEditing } from "../../actions/editingActions";
import EditEmployeeModal from "./EditEmployeeModal";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import AddEmployeeModal from "./AddEmployeeModal";
import {
  deleteNode,
  collapseNode,
  expandNode,
  dragNode,
  dropNode,
} from "../../actions/orgChartActions";
import "./OrgChartNode.scss";

import UserIcon from "../../assets/user-icon.png";

const OrgChartNode = ({
  chart,
  nodeData,
  deleteNode,
  collapseNode,
  startEditing,
  endEditing,
  expandNode,
  dragNode,
  dropNode,
  tooltip,
}) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [deletePopupShow, setDeletePopupShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addMode, setAddMode] = useState("DIRECT_REPORT");
  const [toolTipShow, setToolTipShow] = useState(false);

  const nodeRef = useRef();
  useEffect(() => {
    nodeRef.current = document.querySelector(`#${nodeData.id}`);
    // nodeRef.current.setAttribute("draggable", true);
    nodeRef.current.addEventListener("dragend", function () {
      dragNode(nodeData.id);
    });

    nodeRef.current.addEventListener("drop", function () {
      dropNode(nodeData.id);
    });
  }, []);

  const handleDelete = () => {
    deleteNode(nodeData);
    setDeletePopupShow(false);
  };

  useEffect(() => {
    if (!nodeData.id) {
      setToolTipShow(true);
      setTimeout(() => {
        setToolTipShow(false);
      }, 5000);
    }
  }, [nodeData]);

  useEffect(() => {
    if (editModalShow || addModalShow || deletePopupShow) {
      startEditing();
    } else {
      endEditing();
    }
  }, [editModalShow, addModalShow, deletePopupShow]);

  const handleClickNode = () => {
    setEditModalShow(true);
  };

  return (
    <div>
      <ManualToggleToolTip show={toolTipShow} message="Click the card to edit.">
        <div
          className={`oc-inner ${
            tooltip.open &&
            tooltip.step === 3 &&
            chart.currentChart.id === nodeData.id
              ? "firstNode"
              : ""
          }`}
          onClick={(evt) => {
            evt.stopPropagation();
            handleClickNode();
          }}
        >
          {nodeData.children && nodeData.children.length ? (
            <ToolTip message="Collapse" delay={{ show: 150, hide: 250 }}>
              <button
                className="collapse-expand"
                data-html2canvas-ignore="true"
                onClick={(evt) => {
                  evt.stopPropagation();
                  collapseNode(nodeData.id);
                }}
              >
                <i class="fas fa-chevron-up"></i>
              </button>
            </ToolTip>
          ) : null}
          {chart.collapsedChart &&
          chart.collapsedCharts.find(
            (chart) => chart.collapsedNodeId === nodeData.id
          ) ? (
            <ToolTip message="Expand" delay={{ show: 150, hide: 250 }}>
              <button
                data-html2canvas-ignore="true"
                className="collapse-expand"
                onClick={(evt) => {
                  evt.stopPropagation();
                  expandNode(nodeData.id);
                }}
              >
                <i class="fas fa-chevron-down"></i>
              </button>
            </ToolTip>
          ) : null}
          {!chart.collapsedChart && nodeData.id && (
            <div
              data-html2canvas-ignore="true"
              className="onclick-add add-top"
              onClick={(evt) => {
                evt.stopPropagation();
                setAddMode("HEAD");
                setAddModalShow(true);
              }}
            >
              <i className="fas fa-plus"></i>
            </div>
          )}
          {!chart.collapsedChart && nodeData.id && (
            <div
              data-html2canvas-ignore="true"
              className="onclick-add add-bottom"
              onClick={(evt) => {
                evt.stopPropagation();
                setAddMode("DIRECT_REPORT");
                setAddModalShow(true);
              }}
            >
              <i className="fas fa-plus"></i>
            </div>
          )}
          {!chart.collapsedChart && nodeData.manager && (
            <div
              data-html2canvas-ignore="true"
              className="onclick-add add-left"
              onClick={(evt) => {
                evt.stopPropagation();
                setAddMode("COLLEAGUE_LFET");
                setAddModalShow(true);
              }}
            >
              <i className="fas fa-plus"></i>
            </div>
          )}
          {!chart.collapsedChart && nodeData.manager && (
            <div
              data-html2canvas-ignore="true"
              className="onclick-add add-right"
              onClick={(evt) => {
                evt.stopPropagation();
                setAddMode("COLLEAGUE_RIGHT");
                setAddModalShow(true);
              }}
            >
              <i className="fas fa-plus"></i>
            </div>
          )}
          {!chart.collapsedChart && (
            <Dropdown
              onClick={(evt) => {
                evt.stopPropagation();
              }}
              className="more-options-dropdown"
              data-html2canvas-ignore="true"
            >
              <Dropdown.Toggle
                id="dropdown-basic"
                className="more-options-dropdown-btn"
              >
                <i class="fas fa-ellipsis-h"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="more-options-dropdown-menu">
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
          )}
          {/* <AccountCircleSharpIcon
            style={{ fontSize: 48, color: "#431f85", marginBottom: 4 }}
          /> */}
          <img
            src={UserIcon}
            width={48}
            alt="User Icon"
            style={{ marginBottom: 5 }}
          />
          <div className="name">{nodeData.name}</div>
          <div className="title">{nodeData.title}</div>
          <div className="email">{nodeData.email}</div>
        </div>
      </ManualToggleToolTip>
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

const mapStateToProps = ({ chart, tooltip }) => ({ chart, tooltip });

export default connect(mapStateToProps, {
  deleteNode,
  collapseNode,
  expandNode,
  startEditing,
  endEditing,
  dragNode,
  dropNode,
})(OrgChartNode);
