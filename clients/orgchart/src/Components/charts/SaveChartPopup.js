import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";

import "./EditEmployeeModal.scss";

const SaveChartPopup = ({ createChart, setSavePopupShow, ...otherProps }) => {
  const [chartName, setChartName] = useState("");

  const handleSubmit = () => {
    createChart(chartName);
    setChartName("");
    setSavePopupShow(false);
  };

  return (
    <Modal
      {...otherProps}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="chart-control-modal"
      size="sm"
    >
      <Modal.Header className="header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          SAVE NEW CHART
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              className="modal-input"
              type="text"
              placeholder="Chart name"
              name="name"
              value={chartName}
              onChange={(evt) => setChartName(evt.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button className="close-btn" onClick={otherProps.onHide}>
          Back
        </button>
        <button className="confirm-btn" onClick={handleSubmit}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null)(SaveChartPopup);
