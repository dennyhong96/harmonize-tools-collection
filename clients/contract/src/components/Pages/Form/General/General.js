import React, { Fragment } from "react";
import "./General.css";
import { useHistory } from "react-router-dom";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { useForm, Controller } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../../../updateAction";
import { TextField } from "@material-ui/core";
import { Select } from "antd";
import "antd/dist/antd.css";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../UI/Title/Title";
import { Popover } from "antd";

import Navigation from "../../../Navigation/Navigation";

const { Option } = Select;

const tip1 = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>How is the form created?</b> <br />
    Your response to each question determines what goes into your customized
    contract. Make sure to fill out all fields so we can help you put everything
    together!
    <br /> <br />
    You can find out the additional information throughout by hovering over{" "}
    <b>"i"</b> icon. <Tooltip />
  </span>
);

const tip2 = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>Which jurisdiction am I under?</b> <br />
    Parties usually prefer that the jurisdiction be based on their location or
    the location of their headquarters. It can save the time and the money to
    set in the contract as opposed to letting the court decide the jurisdiction.
  </span>
);

const tip3 = (
  <span style={{ color: "black", fontSize: "14px" }}>
    Click <b>Next</b> to save your entries!
  </span>
);

export default () => {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: state.formDetails,
  });

  const onBackStep = (e) => {
    e.preventDefault();
    push("/getStarted");
  };

  const onNextStep = (data) => {
    action(data);
    push("/disclosing");
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs={3}>
            <Navigation />
          </Col>
          <Col xs={{ span: 8, offset: 1 }}>
            <form onSubmit={handleSubmit(onNextStep)}>
              <Title />
              <div className="form-container">
                {/*     1. NDA     */}
                <div style={{ marginBottom: "30px" }}>
                  <h1 className="form-question">
                    This Non-Disclosure Agreement does not cover healthcare
                    personnel, employees and professsionals who have access to
                    medical information.
                    {/* <Tooltip placement="right" visible={true} tips={tip1} /> */}
                  </h1>
                  {errors.formType && (
                    <p className="required">This is required.</p>
                  )}

                  {/* <div style={{ marginTop: "20px" }}>
              <input
                type="radio"
                name="formType"
                value="Non-Discolsure Agreement"
                ref={register({ required: true })}
              />
              <label
                style={{ color: "grey", marginLeft: "10px" }}
                className="radio"
              >
                No
              </label>
            </div>


            <div style={{ marginBottom: "40px" }}>
              <input
                disabled
                type="radio"
                name="formType"
                value="Medical Non-Discolsure Agreement"
                ref={register({ required: true })}
              />
              <label
                style={{ color: "grey", marginLeft: "10px" }}
                className="radio"
              >
                {" "}
                Yes
              </label>
            </div> */}
                </div>
                {/*     2. Contract Date     */}

                <div style={{ marginBottom: "40px" }}>
                  <h2 className="form-question">Contract date</h2>
                  {errors.contractDate && (
                    <p className="required">This is required.</p>
                  )}
                  <Controller
                    rules={{ required: true }}
                    // defaultValue="2020-07-10"
                    control={control}
                    name="contractDate"
                    as={
                      <TextField
                        label="Select Date"
                        style={{
                          width: "40%",
                          marginTop: "5px",
                        }}
                        InputProps={{ style: { fontSize: 14 } }}
                        name="contractDate"
                        id="date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputRef={register}
                        bordered="false"
                      />
                    }
                  />
                </div>

                {/*     3. State      */}

                <div style={{ marginBottom: "40px" }}>
                  <h1 className="form-question">
                    Under which state jurisdiction should the contract be
                    created?
                    <Tooltip placement="top" tips={tip2} />
                  </h1>
                  {errors.state && (
                    <p className="required">This is required.</p>
                  )}
                  <Controller
                    name="state"
                    control={control}
                    defaultValue="Select State"
                    rules={{ required: true }}
                    bordered={false}
                    as={
                      <Select
                        rules={{ required: true }}
                        className="SelectState"
                      >
                        <Option value="Alabama">Alabama</Option>
                        <Option value="Alaska">Alaska</Option>
                        <Option value="Arizona">Arizona</Option>
                        <Option value="Arkansas">Arkansas</Option>
                        <Option value="California">California</Option>
                        <Option value="Colorado">Colorado</Option>
                        <Option value="Connecticut">Connecticut</Option>
                        <Option value="Delaware">Delaware</Option>
                        <Option value="District Of Columbia">
                          District Of Columbia
                        </Option>
                        <Option value="Florida">Florida</Option>
                        <Option value="Georgia">Georgia</Option>
                        <Option value="Hawaii">Hawaii</Option>
                        <Option value="Idaho">Idaho</Option>
                        <Option value="Illinois">Illinois</Option>
                        <Option value="Indiana">Indiana</Option>
                        <Option value="Iowa">Iowa</Option>
                        <Option value="Kansas">Kansas</Option>
                        <Option value="Kentucky">Kentucky</Option>
                        <Option value="Louisiana">Louisiana</Option>
                        <Option value="Maine">Maine</Option>
                        <Option value="Maryland">Maryland</Option>
                        <Option value="Massachusetts">Massachusetts</Option>
                        <Option value="Michigan">Michigan</Option>
                        <Option value="Minnesota">Minnesota</Option>
                        <Option value="Mississippi">Mississippi</Option>
                        <Option value="Missouri">Missouri</Option>
                        <Option value="Montana">Montana</Option>
                        <Option value="Nebraska">Nebraska</Option>
                        <Option value="Nevada">Nevada</Option>
                        <Option value="New Hampshire">New Hampshire</Option>
                        <Option value="New Jersey">New Jersey</Option>
                        <Option value="New Mexico">New Mexico</Option>
                        <Option value="New York">New York</Option>
                        <Option value="North Carolina">North Carolina</Option>
                        <Option value="North Dakota">North Dakota</Option>
                        <Option value="Ohio">Ohio</Option>
                        <Option value="Oklahoma">Oklahoma</Option>
                        <Option value="Oregon">Oregon</Option>
                        <Option value="Pennsylvania">Pennsylvania</Option>
                        <Option value="Rhode Island">Rhode Island</Option>
                        <Option value="South Carolina">South Carolina</Option>
                        <Option value="South Dakota">South Dakota</Option>
                        <Option value="Tennessee">Tennessee</Option>
                        <Option value="Texas">Texas</Option>
                        <Option value="Utah">Utah</Option>
                        <Option value="Vermont">Vermont</Option>
                        <Option value="Virginia">Virginia</Option>
                        <Option value="Washington">Washington</Option>
                        <Option value="West Virginia">West Virginia</Option>
                        <Option value="Wisconsin">Wisconsin</Option>
                        <Option value="Wyoming">Wyoming</Option>
                      </Select>
                    }
                  />
                </div>

                {/*********  Steps  *********/}
                <div className="step-container">
                  <button className="Back-Button" onClick={onBackStep}>
                    Back
                  </button>
                  <span className="btn">
                    <Popover
                      placement="topLeft"
                      defaultVisible={true}
                      content={tip3}
                    >
                      <button className="Button" type="submit">
                        Next
                      </button>
                    </Popover>
                  </span>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
