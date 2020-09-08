import React, { useState } from "react";
import updateAction from "../../../../updateAction";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { TextField } from "@material-ui/core";
import Navigation from "../../../Navigation/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../UI/Title/Title";

const TimePeriod = (props) => {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: state.formDetails,
  });

  const [isYearRule, setIsYearRule] = useState(false);
  const [isOccurrenceRule, setIsOccurrenceRule] = useState(false);

  const checkYearsRequired = () => {
    setIsYearRule(true);
  };

  const checkOccurenceRequired = () => {
    setIsOccurrenceRule(true);
  };
  const onNextStep = (data) => {
    action(data);
    push("/downloadTo");
    console.log(data);
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/otherInformation");
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
              {/*********  Time Period *********/}
              <div style={{ marginBottom: "40px" }}>
                <h1 className="form-question">
                  Do you wish provisions of this agreement to
                  <Tooltip placement="right" tips={timePeriodTip2} />
                </h1>
                {errors.timePeriod && (
                  <p className="required">This is required.</p>
                )}

                {/*********    1. Survive its termination   *********/}
                <div style={{ marginTop: "20px" }}>
                  <input
                    type="radio"
                    name="timePeriod"
                    value="Survive its termination"
                    ref={register({ required: true })}
                  />
                  <label
                    style={{ marginLeft: "10px", fontSize: "14px" }}
                    className="radio"
                  >
                    Survive its termination
                    <Tooltip placement="right" tips={timePeriodTip1} />
                  </label>
                </div>

                {/*********    2. Termination Year   *********/}
                <div style={{ marginBottom: "30px", display: "inline-block" }}>
                  <input
                    type="radio"
                    name="timePeriod"
                    value="years"
                    ref={register({ required: true })}
                    onClick={checkYearsRequired}
                  />
                  <label style={{ marginLeft: "10px", fontSize: "14px" }}>
                    Remain in effect for number of years
                  </label>
                  {errors.terminationYears && (
                    <p className="required" style={{ paddingLeft: "20px" }}>
                      This is required.
                    </p>
                  )}

                  <Controller
                    rules={{ required: isYearRule }}
                    as={
                      <TextField
                        label="Years"
                        style={{
                          marginTop: "0",
                          marginLeft: "20px",
                          width: "40%",
                        }}
                        InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                        InputProps={{
                          style: { fontSize: 14 },
                          inputProps: { min: 0 },
                        }}
                        size="small"
                        type="number"
                        bordered={false}
                        name="terminationYears"
                      />
                    }
                    control={control}
                    name="terminationYears"
                  />
                </div>
                {/*********    3. Termination Occurence   *********/}
                <div style={{ marginBottom: "40px", display: "inline-block" }}>
                  <input
                    type="radio"
                    name="timePeriod"
                    value="occurance"
                    ref={register({ required: true })}
                    onClick={checkOccurenceRequired}
                  />
                  <label style={{ marginLeft: "10px", fontSize: "14px" }}>
                    Remain in effect until a specific occurrence
                  </label>

                  {errors.terminationOccurence && (
                    <p className="required" style={{ paddingLeft: "20px" }}>
                      This is required.
                    </p>
                  )}
                  <Controller
                    rules={{ required: isOccurrenceRule }}
                    as={
                      <TextField
                        label="Ex. end of employment"
                        style={{
                          marginTop: "0",
                          width: "70%",
                          marginLeft: "20px",
                        }}
                        bordered={false}
                        name="terminationOccurence"
                        InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                        InputProps={{ style: { fontSize: 14 } }}
                        size="small"
                      />
                    }
                    control={control}
                    name="terminationOccurence"
                  />
                </div>
              </div>

              {/*********  Other exception for the time period *********/}
              {/* <div style={{ width: "90%", marginBottom: "40px" }}>
            <h1 className="form-question" style={{ color: "#868383" }}>
              Is there an exception for the time period of the contract?{" "}
            </h1>

            <Controller
              as={
                <TextField
                  label="Ex. Example"
                  style={{ width: "80%", marginTop: "10px" }}

                  bordered={false}
                />
              }
              control={control}
              name="terminationException"
            />
          </div> */}

              {/*********  Steps  *********/}
              <div>
                <div className="step-container" >
                  <button className="Back-Button" onClick={onBackStep}>
                    Back
                  </button>
                  <span className="btn">
                    <button className="Button" type="submit">
                      Next
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
export default TimePeriod;

const timePeriodTip2 = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>What should the duration of my contract be?</b>
    <br /> The usual time of protection for ordinary confidential information is
    2 to 5 years which is what we suggest.
  </span>
);

const timePeriodTip1 = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>What does "survive its termination" mean?</b>
    <br /> To survive the termination of the Agreement means that there is no
    end date to keep the information secret.
  </span>
);
