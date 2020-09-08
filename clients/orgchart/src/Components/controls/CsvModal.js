import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./CsvModal.scss";

import csv from "../../assets/csv.png";

const CsvModal = ({ show, handleClose }) => {
  return (
    <Modal
      className="csv-modal"
      show={show}
      onHide={handleClose}
      size="md"
      centered
    >
      <Modal.Body>
        <p>
          Your updated template should look like this.
          <br />
          Unfortunately, custom fields are not currently allowed.
        </p>
        <img src={csv} alt="csv" width="100%" />
      </Modal.Body>
      <Modal.Footer>
        <button className="step-one-continue" onClick={handleClose}>
          Okay
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CsvModal;
