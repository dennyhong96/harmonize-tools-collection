import React from "react";
import { Button } from "react-bootstrap";

const StepTwo = () => {
  return (
    <div className="py-5">
      <h2>Step 2</h2>
      <p>Enter your employee information</p>
      <p>Save your updated template as a .CSV file</p>
      <Button variant="secondary">Back</Button>
      <Button variant="primary">Continue</Button>
    </div>
  );
};

export default StepTwo;
