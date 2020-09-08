import React from "react";
import updateAction from "../../../../updateAction";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { TextField } from "@material-ui/core";
import Navigation from "../../../Navigation/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../UI/Title/Title";

const OtherInformation = (props) => {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, control } = useForm({
    defaultValues: state.formDetails,
  });

  const onNextStep = (data) => {
    action(data);
    push("/timePeriod");
    console.log(data);
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/confidentiality");
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
              {/*********  Other Information *********/}
              <div style={{ marginBottom: "40px", marginTop: "150px" }}>
                <h1 className="form-question" style={{ color: "#868383" }}>
                  Is there any other information that should be included in the
                  contract?
                  <Tooltip placement="bottomLeft" tips={otherInfo} />
                </h1>

                <Controller
                  as={
                    <TextField
                      label="*Optional"
                      style={{ width: "80%", marginTop: "10px" }}
                      inputRef={register}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  ref={register({ required: true })}
                  name="otherInformation"
                />
              </div>

              {/*********  Steps  *********/}
              <div style={{ marginTop: "100px" }}>
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

const otherInfo = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>What can be included in "other information"?</b> <br />
    You can include specific kinds of information to which you would like to
    extend a protection.
  </span>
);
export default OtherInformation;
