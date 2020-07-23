import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Form } from "react-bootstrap";

import "./StepThree.scss";

const StepThree = ({ setStep, handleUpload }) => {
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
          label={file.name || "Upload"}
          custom
          onChange={handleFileChange}
        />
      </Form>
      <div {...getRootProps()} className="drop-file-box">
        <input {...getInputProps()} />
        <p>{file.name || "Drop File"}</p>
      </div>
      <Button variant="secondary" onClick={() => setStep(1)}>
        Back
      </Button>
      {file ? (
        <Button variant="primary" onClick={() => handleUpload(file)}>
          Submit
        </Button>
      ) : (
        <Button variant="primary" disabled>
          Submit
        </Button>
      )}
    </div>
  );
};

export default StepThree;
