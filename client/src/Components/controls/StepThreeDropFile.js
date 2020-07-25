import React, { Fragment } from "react";

const StepThreeDropFile = ({
  getRootProps,
  getInputProps,
  file,
  handleDeleteFile,
}) => {
  return (
    <div {...getRootProps()} className="drop-file-box">
      <div className="drop-file-inner-box">
        <input {...getInputProps()} />
        {!file && (
          <Fragment>
            <p className="drop-file-name">Drag & drop .CSV file here</p>
            <p className="drop-file-name">or</p>
            <button>Select a file from your computer</button>
          </Fragment>
        )}
        {file && (
          <Fragment>
            <div
              className={`csv-icon ${file.type !== "text/csv" ? "error" : ""}`}
            >
              {file.type === "text/csv" ? (
                <i class="fas fa-file-csv"></i>
              ) : (
                <i class="fas fa-exclamation-circle"></i>
              )}
            </div>
            <p className="drop-file-name">
              {file.name}{" "}
              <span className="delete-file" onClick={handleDeleteFile}>
                <i class="fas fa-trash-alt"></i>
              </span>
            </p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default StepThreeDropFile;
