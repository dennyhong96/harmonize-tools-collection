import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";

import { addNode } from "../../actions/orgChartActions";
import "./EditEmployeeModal.scss";

const AddEmployeeModal = ({
  addMode,
  selectedNode,
  addNode,
  ...otherProps
}) => {
  const [formData, setFormData] = useState({ name: "", title: "", email: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (addMode === "DIRECT_REPORT") {
      addNode(selectedNode.id, formData);
    }
    otherProps.setAddModalShow(false);
  };

  const { name, title, email } = formData;

  return (
    <Modal
      {...otherProps}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="chart-control-modal"
    >
      <Modal.Header className="header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {addMode === "DIRECT_REPORT" && "ADD DIRECT REPORT"}
          {addMode === "COLLEAGUE" && "ADD COLLEAGUE"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChange}
              className="modal-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
              className="modal-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email"
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

export default connect(null, { addNode })(AddEmployeeModal);
