import React from "react";
import updateAction from "../../../../updateAction";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { TextField } from "@material-ui/core";
import Navigation from "../../../Navigation/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../UI/Title/Title";
import './DownloadTo.css'

const DownloadTo = (props) => {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { handleSubmit, control, errors } = useForm({
    defaultValues: state.formDetails,
  });

  const onNextStep = (data) => {
    action(data);
    push("/pdf");
    console.log(data);
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/timePeriod");
  };

  return (
    <Container>
      <Row>
        <Col xs={3}><Navigation /></Col>

      <Col>
      <form onSubmit={handleSubmit(onNextStep)}>
        <Title />
        <div className="form-container">
          {/*********  Parties Relationship *********/}
          <div style={{ marginBottom: "40px" }}>
            <h2 className="save-changes-h1" style={{ marginBottom: "40px" }}>
              Save Changes
            </h2>
            <h2 className="form-question">Form Name</h2>
            {errors.downloadCompnay && (
              <p className="required">This is required.</p>
            )}
            <Controller
              as={
                <TextField
                  label="Ex. My Non-Disclosure Agreement"
                  style={{ width: "80%" }}
                  bordered={false}
                  InputLabelProps={{style: {fontSize: 13}}} // font size of input label
                  InputProps={{style: {fontSize: 14}}} 
                  size='small'
                />
              }
              control={control}
              rules={{ required: true }}
              name="downloadCompnay"
            />
          </div>

          <h2 className="form-question">Add Notes</h2>
          {errors.downloadEmail && (
            <p className="required">This is required.</p>
          )}
          <Controller
            as={
              <TextField
                label="Ex. Created in 2020 to match new company guidelines"
                style={{ width: "80%" }}
                bordered={false}
                InputLabelProps={{style: {fontSize: 13}}} // font size of input label
                InputProps={{style: {fontSize: 14}}} 
                size='small'
              />
            }
            control={control}
            rules={{ required: true }}
            name="downloadEmail"
          />

          {/*********  Steps  *********/}
          <div style={{ marginTop: "100px" }}>
            <div className="step-container" >
              <button className="Back-Button" onClick={onBackStep}>
                Save as
              </button>
              <span className="btn">
                <button className="Button" type="submit">
                  Save
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
      </Col>
      </Row>
    </Container>
  );
};

export default DownloadTo;
