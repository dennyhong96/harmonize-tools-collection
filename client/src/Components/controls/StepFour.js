import React from "react";
import { Button } from "react-bootstrap";

const StepFour = ({ setStep }) => {
  return (
    <div className="py-5">
      <h2>Congrats</h2>
      <p>Your chart is now viewable on the right-hand side of the screen.</p>
      <Button
        variant="secondary"
        onClick={() => {
          setStep(3);
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default StepFour;
