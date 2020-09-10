import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../../../updateAction";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import docDefinition from "../../../../utils/docDev";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function GeneratePdf() {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { handleSubmit } = useForm({
    defaultValues: state.formDetails,
  });

  const onNextStep = (data) => {
    action(data);
    push("/downloadTo");
    console.log(data);
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/timePeriod");
  };

  pdfMake.createPdf(docDefinition(state)).getDataUrl(function (outDoc) {
    document.getElementById("generatedPDF").src = outDoc;
  });

  return (
    <>
      <form onSubmit={handleSubmit(onNextStep)}>
        <div className="form-container">
          <div
            style={{
              display: "inline-flex",
              position: "relative",
              width: "840px",
              height: "100%",
            }}
          >
            <iframe
              id="generatedPDF"
              // onLoad="resizeIframe(this)"
              type="application/pdf"
              title="NDA"
              style={{
                frameBorder: "0",
                positon: "absolute",
                top: "0",
                left: "0",
                width: "640px",
                height: "800px",
              }}
            />
          </div>

          {/*********  Steps  *********/}
          <div
            style={{ width: "680px", marginTop: "15px", marginBottom: "50px" }}
          >
            <div className="step-container">
              <button className="Back-Button" onClick={onBackStep}>
                Back
              </button>
              <button
                className="Button"
                type="submit"
                onClick={() => push("/downloadTo")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
