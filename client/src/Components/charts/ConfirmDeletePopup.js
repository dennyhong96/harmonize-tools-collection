import React from "react";
import { Modal } from "react-bootstrap";

import "./ConfirmDeletePopup.scss";

const ConfirmDeletePopup = ({
  deletePopupShow,
  onHide,
  deleteName,
  handleDelete,
}) => {
  return (
    <Modal
      show={deletePopupShow}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="delete-popup"
    >
      <Modal.Body>
        <p>
          <i className="fas fa-exclamation-circle"></i>{" "}
          <strong className="attention">CAUTION:</strong> Deleting{" "}
          <strong>{deleteName}</strong> will also delete his/her all
          subordinates.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="close-btn" onClick={onHide}>
          Back
        </button>
        <button className="confirm-btn" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeletePopup;
