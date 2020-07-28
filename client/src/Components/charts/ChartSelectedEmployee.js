import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import useDownload from "../../hooks/useDownload";
import { deleteNode } from "../../actions/orgChartActions";
import EditEmployeeModal from "./EditEmployeeModal";
import AddEmployeeModal from "./AddEmployeeModal";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import "./ChartSelectedEmployee.scss";

const ChartEmployeePanel = ({ selectedNode, setSelectedNode, deleteNode }) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [deletePopupShow, setDeletePopupShow] = useState(false);
  const [addMode, setAddMode] = useState("DIRECT_REPORT");

  const handleDelete = () => {
    deleteNode(selectedNode);
    setDeletePopupShow(false);
  };

  const { handleDownload } = useDownload();

  return (
    <Fragment>
      <div className="action">
        {selectedNode ? (
          <Fragment>
            <button onClick={() => setEditModalShow(true)}>
              Edit Employee
            </button>
            <button
              onClick={() => {
                setAddMode("DIRECT_REPORT");
                setAddModalShow(true);
              }}
            >
              Add Subordinate
            </button>
            <button
              onClick={() => {
                setAddMode("COLLEAGUE");
                setAddModalShow(true);
              }}
            >
              Add Colleague
            </button>
            <button
              onClick={() => {
                setAddMode("HEAD");
                setAddModalShow(true);
              }}
            >
              Add New Head
            </button>
            <button onClick={() => setDeletePopupShow(true)}>
              Delete Employee
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button disabled className="inactive-btn">
              Edit Employee
            </button>
            <button disabled className="inactive-btn">
              Add Subordinate
            </button>
            <button disabled className="inactive-btn">
              Add Colleague
            </button>
            <button
              onClick={() => {
                setAddMode("HEAD");
                setAddModalShow(true);
              }}
            >
              Add New Head
            </button>
            <button disabled className="inactive-btn">
              Delete Employee
            </button>
          </Fragment>
        )}
        <button onClick={() => handleDownload("JPG")}>Download JPG</button>
        <button onClick={() => handleDownload("PDF")}>Download PDF</button>
      </div>
      <EditEmployeeModal
        selectedNode={selectedNode}
        show={editModalShow}
        setEditModalShow={setEditModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <AddEmployeeModal
        selectedNode={selectedNode}
        show={addModalShow}
        setAddModalShow={setAddModalShow}
        onHide={() => setAddModalShow(false)}
        addMode={addMode}
      />
      <ConfirmDeletePopup
        deletePopupShow={deletePopupShow}
        handleDelete={handleDelete}
        onHide={() => setDeletePopupShow(false)}
        deleteName={selectedNode ? selectedNode.name : ""}
      />
    </Fragment>
  );
};

export default connect(null, { deleteNode })(ChartEmployeePanel);
