import React, { useState, Fragment, useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
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
      <Row>
        <Col>
          <div className="selected-employee">
            <h6>Selected Employee:</h6>
            {selectedNode && (
              <div className="employee-info">
                <p>
                  <strong>Name: </strong>
                  {selectedNode.name}
                </p>
                <p>
                  <strong>Title: </strong>
                  {selectedNode.title}
                </p>
                <p>
                  <strong>Email: </strong>
                  {selectedNode.email}
                </p>
                <p>
                  <strong>Manager: </strong>
                  {selectedNode.manager}
                </p>
              </div>
            )}
          </div>
        </Col>
        <Col>
          <div className="action">
            <button onClick={handleDownload}>Download JPG</button>
            <button onClick={handlePDF}>Download PDF</button>
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
            {/* <button onClick={handleDelete}>Delete Employee</button> */}
          </div>
        </Col>
      </Row>
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
