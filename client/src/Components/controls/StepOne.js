import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

const StepOne = () => {
  return (
    <div className="py-5">
      <h2>Step 1</h2>
      <p>Download our .CSV template</p>
      <Button variant="primary">Download</Button>
    </div>
  );
};

export default StepOne;
