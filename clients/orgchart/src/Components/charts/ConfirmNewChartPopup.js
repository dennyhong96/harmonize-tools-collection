import React from "react";
import { Modal } from "react-bootstrap";

import "./ConfirmDeletePopup.scss";

const ConfirmNewChartPopup = ({
  onHide,
  show,
  setNewChartPopupShow,
  startNewChart,
}) => {
  const handleNewChart = () => {
    startNewChart();
    setNewChartPopupShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="delete-popup"
    >
      <Modal.Body>
        <p>
          <i className="fas fa-exclamation-circle"></i>{" "}
          <strong className="attention">CAUTION:</strong> Are you sure you want
          to begin a new chart? Continuing without saving will{" "}
          <strong>clear</strong> your data.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="close-btn" onClick={onHide}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={handleNewChart}>
          Continue
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmNewChartPopup;
