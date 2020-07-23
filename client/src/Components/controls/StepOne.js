import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

const StepOne = () => {
  return (
    <Fragment>
      <div className="py-5">
        <p>Download our .CSV template</p>
        <Button variant="primary">Download</Button>
      </div>
    </Fragment>
  );
};

export default StepOne;
