import React from "react";
import { Modal } from "react-bootstrap";

import "./ConfirmDeletePopup.scss";

const ConfirmDeletePopup = ({
  deletePopupShow,
  onHide,
  selectedNode,
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
        {selectedNode &&
          (selectedNode.manager && selectedNode.children.length ? (
            <p>
              <i className="fas fa-exclamation-circle"></i>{" "}
              <strong className="attention">CAUTION:</strong> Deleting{" "}
              <strong>{selectedNode.name}</strong> will move his/her direct
              reports under <strong>{selectedNode.manager}</strong>
            </p>
          ) : selectedNode.manager && !selectedNode.children.length ? (
            <p>
              <i className="fas fa-exclamation-circle"></i>{" "}
              <strong className="attention">CAUTION:</strong> You are about to
              delete <strong>{selectedNode.name}</strong>
            </p>
          ) : (
            <p>
              <i className="fas fa-exclamation-circle"></i>{" "}
              <strong className="attention">CAUTION:</strong> Deleting{" "}
              <strong>{selectedNode.name}</strong> will delete the whole chart
              as he/she is the root node
            </p>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <button className="close-btn" onClick={onHide}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeletePopup;
