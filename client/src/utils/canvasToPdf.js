import jsPDF from "jspdf";

/**
 * @function canvasToPdf
 * Transforms html canvas into pdf document and downloads it
 * @param {DOMElement} canvas - html canvas element
 */
const canvasToPdf = (canvas) => {
  const pdf = new jsPDF({
    orientation: "landscape",
    // unit: "px",
    format: [canvas.width * 0.75, canvas.height * 0.75],
  });
  pdf.addImage(canvas.toDataURL("image/jpeg"), "jpeg", 0, 0);
  pdf.save("orgchart.pdf");
};

export default canvasToPdf;
