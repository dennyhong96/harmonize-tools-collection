import React from "react";
import updateAction from "../../../../updateAction";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Select } from "antd";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { TextField } from "@material-ui/core";
import Navigation from "../../../Navigation/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../UI/Title/Title";
import "./Disclosing.scss";

const { Option } = Select;

const Disclosing = (props) => {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: state.formDetails,
  });

  const onNextStep = (data) => {
    action(data);
    push("/recieving");
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/general");
  };

  return (
    <Container>
      <Row>
        <Col xs={3}>
          {" "}
          <Navigation />
        </Col>
        <Col xs={{ span: 8, offset: 1 }}>
          <form onSubmit={handleSubmit(onNextStep)}>
            <Title />
            <div className="form-container">
              {/*********  1. Discloser Name *********/}
              <div style={{ marginBottom: "30px" }}>
                <h1 className="form-question">
                  Discloser Name
                  <Tooltip placement="right" tips={discloserTip} />
                </h1>

                <Controller
                  as={
                    <TextField
                      label="Ex. Jane Doe"
                      style={{ width: "80%" }}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }} // font size of input label
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  name="discloserName"
                  rules={{ required: true }}
                />
                {errors.discloserName && (
                  <p className="required">This is required.</p>
                )}
              </div>

              {/*********  2. Discloser Business *********/}
              <div style={{ marginBottom: "30px" }}>
                <h2 className="form-question">Business Name (if different)</h2>
                <Controller
                  as={
                    <TextField
                      label="Ex. Harmonize HQ"
                      style={{ width: "80%" }}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  name="discloserBusiness"
                  rules={{ required: true }}
                />
                {errors.discloserBusiness && (
                  <p className="required">This is required.</p>
                )}
              </div>

              {/*********  3. Discloser Entity *********/}
              {/* <div style={{ marginBottom: "40px" }}>
            <h2 className="form-question">Discloser Entity</h2>
            <Controller
              as={
                <TextField
                  label="Ex. Employer"
                  style={{ width: "40%" }}
                  bordered={false}
                />
              }
              control={control}
              name="discloserEntity"
              rules={{ required: true }}
            />
            {errors.discloserEntity && (
              <p className="required">This is required.</p>
            )}
          </div> */}

              {/*********  4. Discloser Address *********/}

              <div style={{ marginBottom: "40px" }}>
                <h2 className="form-question">Discloser Address</h2>
                {(errors.discloserAddressStreet ||
                  errors.discloserAddressCity ||
                  errors.discloserAddressState ||
                  errors.discloserAddressZipcode) && (
                  <p className="required">This is required.</p>
                )}
                <Controller
                  as={
                    <TextField
                      label="Street Address"
                      style={{ width: "80%" }}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  name="discloserAddressStreet"
                  rules={{ required: true }}
                />

                <Controller
                  as={
                    <TextField
                      label="Address Line 2"
                      style={{ width: "80%", marginTop: "5px" }}
                      inputRef={register}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  name="discloserAddressStreet2"
                />

                <Controller
                  as={
                    <TextField
                      label="City"
                      style={{ width: "33%", marginTop: "5px" }}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  name="discloserAddressCity"
                  rules={{ required: true }}
                />

                <Controller
                  name="discloserAddressState"
                  control={control}
                  defaultValue="State"
                  rules={{ required: true }}
                  as={
                    <Select
                      style={{
                        marginLeft: "2%",
                        marginRight: "2%",
                        width: "23%",
                      }}
                      InputProps={{ style: { fontSize: 14 } }}
                      label="State"
                      bordered={false}
                      className="SelectState"
                    >
                      <Option value="AL">Alabama</Option>
                      <Option value="AK">Alaska</Option>
                      <Option value="AZ">Arizona</Option>
                      <Option value="AR">Arkansas</Option>
                      <Option value="CA">California</Option>
                      <Option value="CO">Colorado</Option>
                      <Option value="CT">Connecticut</Option>
                      <Option value="DE">Delaware</Option>
                      <Option value="DC">District Of Columbia</Option>
                      <Option value="FL">Florida</Option>
                      <Option value="GA">Georgia</Option>
                      <Option value="HI">Hawaii</Option>
                      <Option value="ID">Idaho</Option>
                      <Option value="IL">Illinois</Option>
                      <Option value="IN">Indiana</Option>
                      <Option value="IA">Iowa</Option>
                      <Option value="KS">Kansas</Option>
                      <Option value="KY">Kentucky</Option>
                      <Option value="LA">Louisiana</Option>
                      <Option value="ME">Maine</Option>
                      <Option value="MD">Maryland</Option>
                      <Option value="MA">Massachusetts</Option>
                      <Option value="MI">Michigan</Option>
                      <Option value="MN">Minnesota</Option>
                      <Option value="MS">Mississippi</Option>
                      <Option value="MO">Missouri</Option>
                      <Option value="MT">Montana</Option>
                      <Option value="NE">Nebraska</Option>
                      <Option value="NV">Nevada</Option>
                      <Option value="NH">New Hampshire</Option>
                      <Option value="NJ">New Jersey</Option>
                      <Option value="NM">New Mexico</Option>
                      <Option value="NY">New York</Option>
                      <Option value="NC">North Carolina</Option>
                      <Option value="ND">North Dakota</Option>
                      <Option value="OH">Ohio</Option>
                      <Option value="OK">Oklahoma</Option>
                      <Option value="OR">Oregon</Option>
                      <Option value="PA">Pennsylvania</Option>
                      <Option value="RI">Rhode Island</Option>
                      <Option value="SC">South Carolina</Option>
                      <Option value="SD">South Dakota</Option>
                      <Option value="TN">Tennessee</Option>
                      <Option value="TX">Texas</Option>
                      <Option value="UT">Utah</Option>
                      <Option value="VT">Vermont</Option>
                      <Option value="VA">Virginia</Option>
                      <Option value="WA">Washington</Option>
                      <Option value="WV">West Virginia</Option>
                      <Option value="WI">Wisconsin</Option>
                      <Option value="WY">Wyoming</Option>
                    </Select>
                  }
                />

                <Controller
                  as={
                    <TextField
                      label="Zipcode"
                      style={{ width: "20%", marginTop: "5px" }}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  name="discloserAddressZipcode"
                  rules={{ required: true }}
                />
              </div>

              {/*********  Steps  *********/}
              <div className="step-container">
                <button className="Back-Button" onClick={onBackStep}>
                  Back
                </button>
                <button className="Button" type="submit">
                  Next
                </button>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

const discloserTip = (
  <span style={{ color: "black", fontSize: "13px" }}>
    <b>Who is the Discolser/Disclosing Party?</b>
    <br />
    Disclosing party is a person disclosing confidential information to the
    Receiving Party. E.g. Employer or client who is disclosing confidential
    information to an employee or independent contractor.
  </span>
);

export default Disclosing;
