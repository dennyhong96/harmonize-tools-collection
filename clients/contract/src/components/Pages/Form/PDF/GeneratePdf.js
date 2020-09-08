import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../../../updateAction";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function GeneratePdf() {
  const { push } = useHistory();
  const { state, action } = useStateMachine(updateAction);
  const { handleSubmit } = useForm({
    defaultValues: state.formDetails,
  });

  const onNextStep = (data) => {
    action(data);
    push("/complete");
    console.log(data);
  };

  const onBackStep = (e) => {
    e.preventDefault();
    push("/downloadTo");
  };

  // var partiesRelationship;
  // if(state.formDetails.relationship !== ""){
  //   partiesRelationship = ` ${state.formDetails.relationship} .`
  // }else{
  //   partiesRelationship = ""
  // }
  // ************** Time Period ************** //
  var timePeriod;
  if (state.formDetails.timePeriod === "Survive its termination") {
    timePeriod = `The non-disclosure provisions of this Agreement shall survive the termination of this Agreement and Receiving Party's duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret, in case of trade secrets, or until Disclosing Party sends Receiving Party a written notice releasing Receiving Party from this Agreement, whichever occurs first.\n\n`;
  }
  if (state.formDetails.timePeriod === "years") {
    timePeriod = `The non-disclosure provisions of this Agreement shall remain in effect for ${state.formDetails.terminationYears} years from the date on which the Confidential Information was disclosed or otherwise made available to the Receiving Party. However, the Receiving Party’s obligation to protect trade secrets is perpetual. \n\n`;
  }

  if (state.formDetails.timePeriod === "occurance") {
    timePeriod = `The non-disclosure provisions of this Agreement shall remain in effect until ${state.formDetails.terminationOccurence.toLowerCase()}. However, the Receiving Party’s obligation to protect trade secrets is perpetual. \n\n`;
  }

  // ************** Confidential Information.2d ************** //

  var confidentiality2d;
  if (state.formDetails.otherInformation !== "") {
    confidentiality2d = ` ${state.formDetails.otherInformation}.`;
  }else{
    confidentiality2d="";
  }

  // ************** Confidentiality.3a ************** //
  var confidentiality3a;
  if (state.formDetails.confidentialityAll === "false") {
    confidentiality3a =
      'If Confidential Information is in written form, the Disclosing Party shall label or stamp the materials with the word "Confidential" or some similar warning. If Confidential Information is transmitted orally, the Disclosing Party shall promptly provide writing indicating that such oral communication constituted Confidential Information.\n\n';
  }
  if (state.formDetails.confidentialityAll === "true") {
    confidentiality3a =
      "The above Information shall be considered Confidential regardless of whether such Confidential Information has been expressly designated as confidential or proprietary.\n\n";
  }

  // ************** Confidentiality.3b ************** //

  var confidentiality3b = [];
  if (state.formDetails.confidentiality_1 === true) {
    confidentiality3b.push(
      "publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the Receiving Party;\n\n"
    );
  }
  if (state.formDetails.confidentiality_2 === true) {
    confidentiality3b.push(
      "discovered, created by, or rightfully in the possession of the Receiving Party before disclosure by Disclosing Party and prior to signing this Agreement;\n\n"
    );
  }
  if (state.formDetails.confidentiality_3 === true) {
    confidentiality3b.push(
      "learned by the Receiving Party through legitimate means other than from the Disclosing Party or Disclosing Party's representatives;\n\n"
    );
  }
  if (state.formDetails.confidentiality_4 === true) {
    confidentiality3b.push(
      "information independently developed without the use of any of the provided Confidential Information;\n\n"
    );
  }
  if (state.formDetails.confidentiality_5 === true) {
    confidentiality3b.push(
      "is disclosed by Receiving Party with Disclosing Party's prior written approval;\n\n"
    );
  }
  if (state.formDetails.confidentiality_other !== "" && state.formDetails.confidentiality_6 === true) {
    confidentiality3b.push(`${state.formDetails.confidentiality_other.toLowerCase()};\n\n`);
  }

  // Ordered list - Confidentiality.3b
  var confidentiality3bOrder = ["(a) ", "(b) ", "(c) ", "(d) ", "(e) ", "(f) "];
  var newConfidentiality3b = "";
  for (var i = 0; i < confidentiality3b.length; i++) {
    newConfidentiality3b =
      newConfidentiality3b + confidentiality3bOrder[i] + confidentiality3b[i];
  }

  // ************** NDA Pdf Definition ************** //
  var docDefinition = {
    title: "NDA",
    // pageSize: 'A5',
    // pageMargins: [ 40, 60, 40, 60 ],
    pageSize: 'A4',
    pageMargins:72,
    watermark: {
      text: "PROOF PROOF",
      color: "black",
      opacity: 0.2,
      bold: true,
      italics: false,
    },
    content: [
      {
        text: "Non-Disclosure Agreement (NDA)\n\n",
        style: "header",
        alignment: "center",
      },
      {
        text: [
          'This Nondisclosure Agreement (the "Agreement") dated ',
          {
            text: ` ${state.formDetails.contractDate} `,
            decoration: "underline",
            style: "userInput",
          },
          " (“Effective Date”) is entered into by and between ",
          {
            text: ` ${state.formDetails.discloserBusiness} `,
            decoration: "underline",
            style: "userInput",
          },
          " with its principal offices at ",
          {
            text: ` ${state.formDetails.discloserAddressStreet}, ${state.formDetails.discloserAddressCity}, ${state.formDetails.discloserAddressState}, ${state.formDetails.discloserAddressZipcode}`,
            decoration: "underline",
            style: "userInput",
          },
          ' ("Disclosing Party") and ',
          {
            text: ` ${state.formDetails.recipientName} `,
            decoration: "underline",
            style: "userInput",
          },
          " located at ",
          {
            text: ` ${state.formDetails.recipientAddressStreet}, ${state.formDetails.recipientAddressCity}, ${state.formDetails.recipientAddressState}, ${state.formDetails.recipientAddressZipcode} `,
            decoration: "underline",
            style: "userInput",
          },
          ' ("Receiving Party"), collectively known as the “Parties”.\n\n',
        ],
      },
      {
        text: [
          { text: "WHEREAS, ", bold: true },
          "in connection with a relationship involving Disclosing Party and Receiving Party described in paragraph 1 of this Agreement, Receiving Party may receive or have access to certain information, which is non- public, confidential or proprietary in nature; and\n\n",
          { text: "WHEREAS, ", bold: true },
          "the Disclosing Party wishes to protect and preserve the confidentiality of such information, preventing the unauthorized disclosure of Confidential Information, including Trade Secrets and Proprietary Information as defined below.\n\n",
          { text: "NOW THEREFORE, ", bold: true },
          'in consideration of the mutual covenants, terms and conditions set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the Parties agree to enter into a confidential relationship concerning the disclosure of certain proprietary and confidential information ("Confidential Information").\n\n',
        ],
      },

      {
        text: [
          { text: "1.            Parties Relationship. ", bold: true },
          "The Disclosing Party’s relationship to the Receiving Party can be described as ",
          {
            text: ` ${state.formDetails.disclosingToReceiving} `,
            decoration: "underline",
            style: "userInput",
          },
          " and the Receiving Party’s relationship to the Disclosing Party can be described as ",
          {
            text: ` ${state.formDetails.receivingToDisclosing} `,
            decoration: "underline",
            style: "userInput",
          },
          ".\n\n",
          // {
          //   text: `${partiesRelationship}`,
          //   decoration: "underline",
          //   style: "userInput",
          // },
          // " \n\n",
        ],
      },
      {
        text: [
          {
            text: "2.            Definition of Confidential Information. ",
            bold: true,
          },
          'For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which the Disclosing Party is engaged, whether in oral, visual, written, electronic or other form, that is or was disclosed to or learned by the Receiving Party or its representatives, before, on or after the Effective date. This includes, but is not limited to: \n\n',
          "(a) technical and business information concerning Disclosing Party’s trade secrets, products and services, including product know-how, formulas, designs, devices, diagrams, software code, test results, processes, inventions, research projects and product development, technical memoranda and correspondence, cost information, profits, sales information, accounting and unpublished financial information, business plans, markets and marketing methods, customer lists and customer information, purchasing techniques, supplier lists and supplier information and advertising strategies;\n\n",
          "(b) information concerning Disclosing Party’s employees, including salaries, strengths, weaknesses, and skills;\n\n",
          "(c) information submitted by Disclosing Party’s customers, suppliers, employees, consultants or co-venture partners with Disclosing Party for study, evaluation or use; and\n\n",
          `(d) any other information not generally known to the public which, if misused or disclosed, could reasonably be expected to adversely affect the Disclosing Party’s business.`,
          `${confidentiality2d}`,
          "\n\nConfidential Information also includes any and all, work products, studies and other material which contain, include, refer to or otherwise reflect or are generated from any Confidential Information.\n\n",
        ],
      },

      {
        text: [
          { text: "3a.            Form of Disclosure. ", bold: true },
          'The Disclosing Party herein, not the Receiving Party, is the records owner under state law and the Receiving Party has no right or ownership interest in any confidential information.\n\n',
          `${confidentiality3a}`,
        ],
      },

      {
        text: [
          {
            text: "3b.            Exclusions from Confidential Information. ",
            bold: true,
          },
          "Receiving Party's obligations under this Agreement do not extend to information that is:\n\n",
          `${newConfidentiality3b}`,
        ],
      },

      {
        text: [
          {
            text: "4.            Obligations of Receiving Party.  ",
            bold: true,
          },
          "Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. Receiving Party shall not, without the prior written approval of Disclosing Party, use for Receiving Party's benefit, publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to the detriment of Disclosing Party, any Confidential Information. Receiving Party shall return to the Disclosing Party or destroy any and all records, notes, and other written, printed, or tangible materials in its possession pertaining to Confidential Information immediately if the Disclosing Party requests it and/ or when the Receiving Party’s cooperation with the Disclosing Party ends, for whatever reason.\n\n",
        ],
      },
      {
        text: [
          { text: "5.            Duration. ", bold: true },
          `${timePeriod}`,
        ],
      },
      {
        text: [
          {
            text: "6.            Confidential information of Others. ",
            bold: true,
          },
          "The Receiving Party will not disclose to Disclosing Party, use in Disclosing Party’s business, or cause Disclosing Party to use any trade secret of others.\n\n",
        ],
      },
      {
        text: [
          { text: "7.            Relationships. ", bold: true },
          "Nothing contained in this Agreement shall be deemed to constitute either party a partner, joint venture or employee of the other party for any purpose.\n\n",
        ],
      },
      {
        text: [
          { text: "8.            Severability. ", bold: true },
          "If a court finds any provision of this Agreement invalid, illegal or unenforceable, these provisions shall be interpreted so as best to effect the intent of the parties and the validity, legality and enforceability of the remaining provisions of this Agreement shall not be affected or impaired.\n\n",
        ],
      },
      {
        text: [
          { text: "9.            Integration. ", bold: true },
          "This Agreement expresses the complete understanding of the parties with respect to the subject matter and supersedes all prior proposals, agreements, representations, and understandings. This Agreement may not be amended except in writing signed by both parties.\n\n",
        ],
      },
      {
        text: [
          { text: "10.           No Waiver. ", bold: true },
          "The failure to exercise any right provided in this Agreement shall not constitute a waiver of prior or subsequent rights.\n\n",
        ],
      },
      {
        text: [
          { text: "11.           Injunctive Relief. ", bold: true },
          "The Parties acknowledge and agree that due to the unique and sensitive nature of the Confidential Information, any misappropriation of any of the Confidential Information in violation of this Agreement may cause the Disclosing Party irreparable harm, the amount of which may be difficult or impossible to ascertain, and therefore the Receiving Party agrees that the Disclosing Party shall have the right to apply to a court of competent jurisdiction for an order enjoining any such further misappropriation and for such other relief as the Disclosing Party deems appropriate. This right is to be in addition to the remedies otherwise available to the Disclosing Party.\n\n",
        ],
      },
      {
        text: [
          { text: "12.           Indemnity. ", bold: true },
          "The Receiving Party agrees to indemnify the Disclosing Party against any and all losses, damages, claims or expenses incurred or suffered by the Disclosing Party as a result of the Receiving Party breach of this Agreement. The Receiving Party is aware that financial indemnification may not be sufficient and accepts other remedies.\n\n",
        ],
      },
      {
        text: [
          { text: "13.           Attorney Fees and Expenses. ", bold: true },
          "In a dispute arising out of or related to this Agreement, the prevailing party shall have the right to collect from the other party its reasonable attorney fees and costs and necessary expenditures.\n\n",
        ],
      },
      {
        text: [
          { text: "14.           Notice of Immunity. ", bold: true },
          "The Receiving Party is provided notice that an individual shall not be held criminally or civilly liable under any federal or state trade secret law for the disclosure of a trade secret that is made (i) in confidence to a federal, state, or local government official, either directly or indirectly, or to an attorney; and (ii) solely for the purpose of reporting or investigating a suspected violation of law; or is made in a complaint or other document filed in a lawsuit or other proceeding, if such filing is made under seal. An individual who files a lawsuit for retaliation by an employer for reporting a suspected violation of law may disclose the trade secret to the attorney of the individual and use the trade secret information in the court proceeding, if the individual (i) files any document containing the trade secret under seal; and (ii) does not disclose the trade secret, except pursuant to court order.\n\n",
        ],
      },
      {
        text: [
          { text: "15.            Disclosures required by law. ", bold: true },
          "The Receiving Party may disclose Confidential Information as required to comply with binding orders of governmental entities that have jurisdiction over him or her; provided that the Receiving Party (i) unless prohibited by law, gives the Disclosing Party reasonable written notice to allow the Disclosing Party to seek a protective order or other appropriate remedy, and (ii) discloses only such information as is required by the governmental entity.  \n\n",
        ],
      },
      {
        text: [
          {
            text: "16.           Governing Law and Jurisdiction. ",
            bold: true,
          },
          "The validity, construction and performance of this Agreement shall be governed and construed in accordance with the laws of ",
          {
            text: ` ${state.formDetails.state} `,
            decoration: "underline",
            style: "userInput",
          },
          " applicable to contracts made and to be wholly performed within such state, without giving effect to any conflict of laws of provisions thereof. The Federal and state courts located in ",
          {
            text: ` ${state.formDetails.state} `,
            decoration: "underline",
            style: "userInput",
          },
          " shall have sole and exclusive jurisdiction over any dispute arising under, or in any way connected with or related to, the terms of this Agreement and Receiving Party: (a) consents to personal jurisdiction therein; and (b) waives the right to raise forum non conveniens or any similar objection.\n\n",
        ],
      },
      {
        text: [
          { text: "17.           Counterparts. ", bold: true },
          "This Agreement may be executed in one or more counterparts for the convenience of the parties hereto, each of which shall be deemed an original and all of which together will constitute one and the same instrument. Delivery of an executed counterpart of a signature page to this Agreement by facsimile or via portable document format (pdf) shall be effective as delivery of a mutually executed counterpart to this Agreement. \n\n",
          "The Receiving Party has carefully read all of this Agreement and agrees that all of the restrictions set forth are fair and reasonably required to protect the Disclosing Party’s interests. The Receiving Party has received a copy of this Agreement signed by the parties.\n\n",
          "This Agreement and each party's obligations shall be binding on the representatives, assigns and successors of such party. Each party has signed this Agreement through its authorized representative.\n\n",
        ],
      },
      {
        text: [
          "\n\nIN WITNESS WHEREOF, the parties have executed this Agreement effective as of the Effective Date.\n\n",
          { text: "DISCLOSING PARTY \n\n", bold: true },
          "Signature _____________________________________________________\n\n",
          "Typed or Printed Name ________________________ Date:______________\n\n",
          // "Typed or Printed Name",
          // {
          //   text: `            ${state.formDetails.discloserName}            `,
          //   decoration: "underline",
          //   style: "userInput",
          // },
          // "Date: ",
          // {
          //   text: `   ${state.formDetails.contractDate}   \n\n`,
          //   decoration: "underline",
          //   style: "userInput",
          // },
        ],
      },
      {
        text: [
          { text: "\n\nRECEIVING PARTY \n\n", bold: true },
          "Signature _____________________________________________________\n\n",
          "Typed or Printed Name ________________________ Date:______________",
          // "Typed or Printed Name",
          // {
          //   text: `            ${state.formDetails.recipientName}            `,
          //   decoration: "underline",
          //   style: "userInput",
          // },
          // "Date: ",
          // {
          //   text: `   ${state.formDetails.contractDate}   \n\n`,
          //   decoration: "underline",
          //   style: "userInput",
          // },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 13,
        bold: true,
      },
      userInput: {
        fontSize: 11,
        bold: true,
        lineHeight: 1,
      },
    },
  };

  pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc) {
    document.getElementById("generatedPDF").src = outDoc;
  });

  const DownloadPDF = () => {
    return pdfMake
      .createPdf(docDefinition)
      .download("Non-Disclosure Agreement(NDA).pdf");
  };

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
                <button className="Button" type="submit" onClick={DownloadPDF}>
                  Next
                </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
