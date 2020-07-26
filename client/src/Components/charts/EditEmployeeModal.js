import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";

import { updateNode } from "../../actions/orgChartActions";
import "./EditEmployeeModal.scss";

const EditEmployeeModal = ({ selectedNode, updateNode, ...otherProps }) => {
  const [formData, setFormData] = useState({ name: "", title: "", email: "" });

  useEffect(() => {
    setFormData({
      name: selectedNode ? selectedNode.name : "",
      title: selectedNode ? selectedNode.title : "",
      email: selectedNode ? selectedNode.email : "",
    });
  }, [selectedNode]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
    updateNode(selectedNode.id, formData);
  };

  const { name, title, email } = formData;

  return (
    <Modal
      {...otherProps}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Employee
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="close-btn" onClick={otherProps.onHide}>
          Back
        </button>
        <button className="confirm-btn" onClick={handleSubmit}>
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, { updateNode })(EditEmployeeModal);
