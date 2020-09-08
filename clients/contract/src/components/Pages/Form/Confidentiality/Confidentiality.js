import React from "react";
import updateAction from "../../../../updateAction";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import Navigation from "../../../Navigation/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../UI/Title/Title";

const confidentialTip = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>What does confidentiality mean? </b> <br />
    Confidentiality means that the recipient will not share the information that
    they have received with anyone else. We suggest selecting "everything" to
    include ample protection.
  </span>
);

const exceptionTip = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>All of the exceptions listed here are usually included in all NDA’s.</b>{" "}
    <br /> If you wish, you can add other exceptions here.
  </span>
);

const Confidentiality = (props) => {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: state.formDetails,
  });

  const onNextStep = (data) => {
    action(data);
    push("/otherInformation");
    console.log(data);
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/partiesRelationship");
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
              {/*********  1. All? *********/}
              <div style={{ marginBottom: "30px" }}>
                <h1 className="form-question">
                  What will be confidential?
                  <Tooltip placement="right" tips={confidentialTip} />
                </h1>
                {errors.confidentialityAll && (
                  <p className="required">This is required.</p>
                )}
                <div style={{ marginTop: "15px", fontSize: "14px" }}>
                  <input
                    type="radio"
                    name="confidentialityAll"
                    value="true"
                    ref={register({ required: "This is required." })}
                    defaultChecked={state.formDetails.formType === "Everything"}
                  />
                  <label style={{ marginLeft: "10px" }} class="radio">
                    Everything
                  </label>
                </div>
                <div style={{ marginBottom: "30px", fontSize: "14px" }}>
                  <input
                    type="radio"
                    name="confidentialityAll"
                    value="false"
                    ref={register({ required: true })}
                    defaultChecked={
                      state.formDetails.formType ===
                      'Only documents labeled as "confidential"'
                    }
                  />
                  <label style={{ marginLeft: "10px" }}>
                    {" "}
                    Only documents labeled as "confidential"
                  </label>
                </div>
              </div>

              {/*********  2. Check *********/}
              <div style={{ marginBottom: "10px" }}>
                <h2 className="form-question" style={{ marginBottom: "20px" }}>
                  Are there any confidentiality exceptions that should be
                  included in the contract?
                  <Tooltip placement="right" tips={exceptionTip} />
                </h2>

                <FormControlLabel
                  control={
                    <Controller
                      labelPlacementTop
                      name="confidentiality_1"
                      control={control}
                      render={(props) => (
                        <Checkbox
                          style={{
                            color: "#49208d",
                          }}
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px" }}>
                      Publicly known at the time of disclosure or subsequently
                      becomes publicly known through no fault of the Receiving
                      Party.
                    </span>
                  }
                />

                <FormControlLabel
                  control={
                    <Controller
                      name="confidentiality_2"
                      control={control}
                      render={(props) => (
                        <Checkbox
                          style={{
                            color: "#49208d",
                          }}
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px" }}>
                      Discovered, created by, or rightfully in the possession of
                      the Receiving Party before disclosure by Disclosing Party
                      and prior to signing this Agreement.
                    </span>
                  }
                />

                <FormControlLabel
                  control={
                    <Controller
                      name="confidentiality_3"
                      control={control}
                      render={(props) => (
                        <Checkbox
                          style={{
                            color: "#49208d",
                          }}
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px" }}>
                      Learned by the Receiving Party through legitimate means
                      other than from the Disclosing Party or Disclosing Party's
                      representatives.
                    </span>
                  }
                />

                <FormControlLabel
                  control={
                    <Controller
                      name="confidentiality_4"
                      control={control}
                      render={(props) => (
                        <Checkbox
                          style={{
                            color: "#49208d",
                          }}
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px" }}>
                      Information independently developed without the use of any
                      of the provided Confidential Information.
                    </span>
                  }
                />

                <FormControlLabel
                  control={
                    <Controller
                      name="confidentiality_5"
                      control={control}
                      render={(props) => (
                        <Checkbox
                          style={{
                            color: "#49208d",
                          }}
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px" }}>
                      Is disclosed by Receiving Party with Disclosing Party's
                      prior written approval.
                    </span>
                  }
                />
                <br />
                <FormControlLabel
                  control={
                    <Controller
                      name="confidentiality_6"
                      control={control}
                      render={(props) => (
                        <Checkbox
                          style={{
                            color: "#49208d",
                            marginBottom: "0",
                          }}
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px", marginBottom: "0" }}>
                      Other exceptions
                    </span>
                  }
                />
                <br />
                <Controller
                  as={
                    <TextField
                      label="E.g. widely used programming practices or algorithms."
                      style={{ marginLeft: "30px", width: "50%" }}
                      inputRef={register}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                    />
                  }
                  control={control}
                  ref={register({ required: false })}
                  name="confidentiality_other"
                />

                {/* <Checkbox
              control={control}
              name="confidentiality_other"
              style={{
                color: "black",
                fontSize: "15px",
                width: "90%",
                marginTop: "10px",
              }}
            >
              Other exceptions
              <Controller
                as={
                  <TextField
                    label="E.g. widely used programming practices or algorithms."
                    style={{ width: "80%", marginTop: "10px" }}
                    inputRef={register}
                    bordered={false}
                  />
                }
                control={control}
                ref={register({ required: false })}
                name="confidentiality_other"
              />
            </Checkbox> */}
              </div>

              {/*********  Steps  *********/}
              <div style={{ marginTop: "10px" }}>
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

export default Confidentiality;
