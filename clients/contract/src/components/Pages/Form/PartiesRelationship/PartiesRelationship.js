import React from "react";
import updateAction from "../../../../updateAction";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { TextField } from "@material-ui/core";
import Navigation from "../../../Navigation/Navigation";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../UI/Title/Title";

const relationshipTip = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>How does relationship type affect my contract?</b> <br />
    Specifying working relationship type between parties in the NDA helps to
    establish the purpose of the Agreement.
  </span>
);

const PartiesRelationship = (props) => {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: state.formDetails,
  });

  const onNextStep = (data) => {
    action(data);
    push("/confidentiality");
    console.log(data);
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/recieving");
  };
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Navigation />
        </Col>
        <Col xs={{ span: 8, offset: 1 }}>
          <form onSubmit={handleSubmit(onNextStep)}>
            <Title />
            <div className="form-container">
              {/*********  Parties Relationship *********/}
              <div style={{ marginBottom: "40px" }}>
                <h2 className="form-question">
                  What is the relation of the Disclosing Party to Receiving
                  Party?
                  <Tooltip placement="right" tips={relationshipTip} />
                </h2>
                <Controller
                  as={
                    <TextField
                      label="Ex. Employer"
                      style={{ width: "40%" }}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  ref={register({ required: true })}
                  name="disclosingToReceiving"
                  rules={{ required: true }}
                />
                {errors.disclosingToReceiving && (
                  <p className="required">This is required.</p>
                )}
              </div>

              {/*********  Parties Relationship *********/}
              <div style={{ marginBottom: "40px" }}>
                <h2 className="form-question">
                  What is the relation of Receiving Party to Disclosing Party?
                </h2>
                <Controller
                  as={
                    <TextField
                      label="Ex. Employee"
                      style={{ width: "40%" }}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  ref={register({ required: true })}
                  name="receivingToDisclosing"
                  rules={{ required: true }}
                />
                {errors.receivingToDisclosing && (
                  <p className="required">This is required.</p>
                )}
              </div>

              {/*********  Steps  *********/}
              <div style={{ marginTop: "90px" }}>
                <div className="step-container">
                  <button className="Back-Button" onClick={onBackStep}>
                    Back
                  </button>
                  <button className="Button" type="submit">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default PartiesRelationship;
