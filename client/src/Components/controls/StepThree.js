import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Form } from "react-bootstrap";

import "./StepThree.scss";

const StepThree = ({ setStep }) => {
  const [file, setFile] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleFileChange = (evt) => {
    console.log(evt.target.files[0]);
    setFile(evt.target.files[0]);
    console.log(file);
  };

  return (
    <div className="py-5">
      <h2>Step 3</h2>
      <p>Upload your .CSV file below to populate your organizational chart.</p>
      <Form>
        <Form.File
          id="custom-file"
          label="Upload"
          custom
          onChange={handleFileChange}
        />
      </Form>
      <div {...getRootProps()} className="drop-file-box">
        <input {...getInputProps()} />
        <p>Drop Zone</p>
      </div>
      <Button variant="secondary" onClick={() => setStep(1)}>
        Back
      </Button>
      <Button variant="primary" onClick={() => setStep(3)}>
        Submit
      </Button>
    </div>
  );
};

export default StepThree;
