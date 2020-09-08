import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";

import {
  addNode,
  addColleague,
  addManager,
} from "../../actions/orgChartActions";
import dispatchToast from "../../utils/toast";
import "./EditEmployeeModal.scss";

const INITIAL_STATE = { name: "", title: "", email: "" };

const AddEmployeeModal = ({
  addMode,
  selectedNode,
  addNode,
  addColleague,
  addManager,
  ...otherProps
}) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { name, title, email } = formData;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (name && title) {
      if (addMode === "DIRECT_REPORT") {
        addNode(selectedNode.id, formData);
      } else if (addMode === "COLLEAGUE_LFET") {
        addColleague(selectedNode.id, formData, "LEFT");
      } else if (addMode === "COLLEAGUE_RIGHT") {
        addColleague(selectedNode.id, formData, "RIGHT");
      } else if (addMode === "HEAD") {
        addManager(formData, selectedNode);
      }
      otherProps.setAddModalShow(false);
      setFormData(INITIAL_STATE);
    } else {
      dispatchToast("Missing fields!");
    }
  };

  return (
    <Modal
      onClick={(evt) => evt.stopPropagation()}
      {...otherProps}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="chart-control-modal"
    >
      <Modal.Header className="header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {addMode === "DIRECT_REPORT" && "Add Direct Report"}
          {(addMode === "COLLEAGUE_LFET" || addMode === "COLLEAGUE_RIGHT") &&
            "Add Colleague"}
          {addMode === "HEAD" && "Add Manager"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name *"
              name="name"
              value={name}
              onChange={handleChange}
              className="modal-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title *"
              name="title"
              value={title}
              onChange={handleChange}
              className="modal-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email (Optional)"
              name="email"
              value={email}
              onChange={handleChange}
              className="modal-input"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="close-btn"
          onClick={() => otherProps.setAddModalShow(false)}
        >
          Back
        </button>
        <button className="confirm-btn" onClick={handleSubmit}>
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, { addNode, addColleague, addManager })(
  AddEmployeeModal
);
