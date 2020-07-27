import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

import canvasToImg from "../utils/canvasToImg";
import canvasToPdf from "../utils/canvasToPdf";

const useDownload = () => {
  const orgChartRef = useRef();
  useEffect(() => {
    orgChartRef.current = document.querySelector(".orgchart.myChart");
  }, []);

  const handleDownload = (format) => {
    // Get transform value before screenshot
    const transformValue = orgChartRef.current.style.transform;

    // Reset transform value to get ready for screenshot
    orgChartRef.current.style.transform =
      "scale(1) translateX(0) translateY(0)";
    setTimeout(() => {
      // Takes screenshot
      if (format === "JPG") {
        html2canvas(orgChartRef.current).then((canvas) => {
          canvasToImg(canvas.toDataURL(), `orgchart.jpg`);
        });
      } else if (format === "PDF") {
        html2canvas(orgChartRef.current).then((canvas) => {
          canvasToPdf(canvas);
        });
      }
    }, 350);
    setTimeout(() => {
      // Set transform value back to pre-screenshot
      orgChartRef.current.style.transform = transformValue;
    }, 1100);
  };

  return { handleDownload };
};

export default useDownload;
