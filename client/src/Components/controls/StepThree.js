import React, { useState, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";

import StepThreeDropFile from "./StepThreeDropFile";
import "./StepThree.scss";

const StepThree = ({ setStep, uploadOrgData }) => {
  const [file, setFile] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async (file) => {
    if (await uploadOrgData(file)) {
      setStep(4);
    }
  };

  const handleDeleteFile = (evt) => {
    evt.stopPropagation();
    setFile("");
  };

  return (
    <div className="step-three">
      <div className="step-three-progress-text">
        <span className="st-1 text-center">1. Download Template</span>
        <span className="st-2 ">2. Edit & Save</span>
        <span className="st-3">3. Upload File</span>
        <span className="st-4">4. Generate Chart</span>
      </div>
      <div className="step-three-progress">
        <div className="line"></div>
        <div className="milestone finished ms-1"></div>
        <div className="milestone finished ms-2"></div>
        <div className="milestone active ms-3"></div>
        <div className="milestone ms-4"></div>
      </div>
      <h2 className="step-three-heading">STEP 3</h2>
      <p className="step-three-msg">
        Upload your .CSV file below to populate your organizational chart.
      </p>
      <StepThreeDropFile
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        file={file}
        handleDeleteFile={handleDeleteFile}
      />
      {file &&
        (file.type !== "text/csv" ? (
          <p className="response-failed">Please upload valid csv file only.</p>
        ) : (
          <p className="response-success">
            Your data was uploaded successfully!
          </p>
        ))}
      <Button variant="secondary" onClick={() => setStep(2)}>
        Back
      </Button>
      {file && file.type === "text/csv" ? (
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
