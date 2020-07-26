import React, { useState, Fragment, useRef, useEffect } from "react";
import { connect } from "react-redux";
import html2canvas from "html2canvas";

import canvasToPdf from "../../utils/canvasToPdf";
import canvasToImg from "../../utils/canvasToImg";
import { deleteNode } from "../../actions/orgChartActions";
import EditEmployeeModal from "./EditEmployeeModal";
import AddEmployeeModal from "./AddEmployeeModal";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import "./ChartSelectedEmployee.scss";

const ChartEmployeePanel = ({ selectedNode, deleteNode }) => {
  const orgChartContainerRef = useRef();

  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [deletePopupShow, setDeletePopupShow] = useState(false);
  const [addMode, setAddMode] = useState("DIRECT_REPORT");

  useEffect(() => {
    orgChartContainerRef.current = document.querySelector(".orgchart.myChart");
  }, []);

  const handleDelete = () => {
    deleteNode(selectedNode.id);
    setDeletePopupShow(false);
  };

  const handleDownload = () => {
    html2canvas(orgChartContainerRef.current).then((canvas) => {
      canvasToImg(canvas.toDataURL(), `orgchart.jpg`);
    });
  };

  const handlePDF = () => {
    html2canvas(orgChartContainerRef.current).then((canvas) => {
      canvasToPdf(canvas);
    });
  };

  return (
    <Fragment>
      <div className="action">
        <button className="mb-2" onClick={handleDownload}>
          Download JPG
        </button>
        <button className="mb-2" onClick={handlePDF}>
          Download PDF
        </button>
        <button className="mb-2" onClick={() => setEditModalShow(true)}>
          Edit Employee
        </button>
        <button
          className="mb-2"
          onClick={() => {
            setAddMode("DIRECT_REPORT");
            setAddModalShow(true);
          }}
        >
          Add Employee
        </button>
        <button
          className="mb-2"
          onClick={() => {
            setAddMode("COLLEAGUE");
            setAddModalShow(true);
          }}
        >
          Add Colleague
        </button>
        <button
          className="mb-2"
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
