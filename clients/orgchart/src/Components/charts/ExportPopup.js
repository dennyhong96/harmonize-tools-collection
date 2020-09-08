import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Spinner } from "react-bootstrap";

import useDownload from "../../hooks/useDownload";
import "./ConfirmDeletePopup.scss";

const ConfirmNewChartPopup = ({ onHide, show, setExportPopupShow, toCSV }) => {
  const [format, setFormat] = useState("JPG");
  const { handleDownload } = useDownload();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    if (format === "JPG") {
      handleDownload("JPG");
    } else if (format === "PDF") {
      handleDownload("PDF");
    } else if (format === "CSV") {
      toCSV();
    }
    const timeout = (ms) =>
      new Promise((resolve) =>
        setTimeout(() => {
          setLoading(false);
          setFormat("JPG");
          setExportPopupShow(false);
        }, ms)
      );
    await timeout(500);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`delete-popup export-popup ${loading ? "loading" : ""}`}
    >
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select Export Format:</Form.Label>
            <Form.Control
              as="select"
              custom
              size="sm"
              value={format}
              onChange={(evt) => setFormat(evt.target.value)}
            >
              <option value="JPG">JPG</option>
              <option value="PDF">PDF</option>
              <option value="CSV">CSV</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="close-btn" onClick={onHide}>
          Cancel
        </button>
        <button className="export-btn" onClick={handleExport}>
          Export
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmNewChartPopup;
