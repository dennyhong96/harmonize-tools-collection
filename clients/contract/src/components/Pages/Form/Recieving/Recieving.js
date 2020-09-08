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
const { Option } = Select;

const Recieving = (props) => {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { handleSubmit, control, errors } = useForm({
    defaultValues: state.formDetails,
  });

  const onNextStep = (data) => {
    action(data);
    push("/partiesRelationship");
    console.log(data);
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/disclosing");
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
              {/*********  1. Discloser Name *********/}
              <div style={{ marginBottom: "30px" }}>
                <h1 className="form-question">
                  Recipient Name
                  <Tooltip placement="right" tips={recipientTip} />
                </h1>
                <Controller
                  as={
                    <TextField
                      label="Ex. Jane Doe"
                      style={{ width: "80%" }}
                      bordered={false}
                    />
                  }
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  InputProps={{ style: { fontSize: 14 } }}
                  size="small"
                  control={control}
                  name="recipientName"
                  rules={{ required: true }}
                />
                {errors.recipientName && (
                  <p className="required">This is required.</p>
                )}
              </div>

              {/* ********  2. Recipient Entity ********
          <div style={{ marginBottom: "40px" }}>
            <h2 className="form-question">Recipient Entity</h2>
            <Controller
              as={
                <TextField
                  label="Ex. Employee"
                  style={{ width: "40%" }}
                  bordered={false}
                />
              }
              control={control}
              name="recipientEntity"
              rules={{ required: true }}
            />
            {errors.recipientEntity && (
              <p className="required">This is required.</p>
            )}
          </div> */}

              {/*********  3. Recipient  Address *********/}
              <div style={{ marginBottom: "70px" }}>
                <h2 className="form-question">Recipient Address</h2>
                {(errors.recipientAddressStreet ||
                  errors.recipientAddressCity ||
                  errors.recipientAddressState ||
                  errors.recipientAddressZipcode) && (
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
                  name="recipientAddressStreet"
                  rules={{ required: true }}
                />

                <Controller
                  as={
                    <TextField
                      label="Address Line 2"
                      style={{ width: "80%", marginTop: "5px" }}
                      bordered={false}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      InputProps={{ style: { fontSize: 14 } }}
                      size="small"
                    />
                  }
                  control={control}
                  name="recipientAddressStreet2"
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
                  name="recipientAddressCity"
                  rules={{ required: true }}
                />

                <Controller
                  name="recipientAddressState"
                  control={control}
                  defaultValue="State"
                  rules={{ required: true }}
                  as={
                    <Select
                      style={{
                        marginLeft: "2%",
                        marginRight: "2%",
                        width: "23%",
                        marginBottom: "0px",
                        marginTop: "10px",
                      }}
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
                  name="recipientAddressZipcode"
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

const recipientTip = (
  <span style={{ color: "black", fontSize: "14px" }}>
    <b>Who is the Recipient or the Recieving Party?</b>
    <br /> Receiving Party is a party who receives confidential information and
    is obligated to keep it secret E.g. employee
  </span>
);
export default Recieving;
