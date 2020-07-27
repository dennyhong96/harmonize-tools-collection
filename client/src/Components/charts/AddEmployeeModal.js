import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";

import {
  addNode,
  addColleague,
  addNewHead,
} from "../../actions/orgChartActions";
import dispatchToast from "../../utils/toast";
import "./EditEmployeeModal.scss";

const INITIAL_STATE = { name: "", title: "", email: "" };

const AddEmployeeModal = ({
  addMode,
  selectedNode,
  addNode,
  addColleague,
  addNewHead,
  ...otherProps
}) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { name, title, email } = formData;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (name && title && email) {
      if (addMode === "DIRECT_REPORT") {
        addNode(selectedNode.id, formData);
      } else if (addMode === "COLLEAGUE") {
        addColleague(selectedNode.id, formData);
      } else if (addMode === "HEAD") {
        addNewHead(formData);
      }
      otherProps.setAddModalShow(false);
      setFormData(INITIAL_STATE);
    } else {
      dispatchToast("Missing fields!");
    }
  };

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
          {addMode === "HEAD" && "ADD NEW HEAD"}
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

export default connect(null, { addNode, addColleague, addNewHead })(
  AddEmployeeModal
);
