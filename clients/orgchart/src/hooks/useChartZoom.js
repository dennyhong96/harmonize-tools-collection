import { useState, useEffect, useRef } from "react";

const useChartZoom = (initialScale) => {
  const [zoomLevel, setZoomLevel] = useState(initialScale);
  const orgChartElRef = useRef(null);

  useEffect(() => {
    // Hook onto orgchart DOM element
    orgChartElRef.current = document.querySelector(".orgchart.myChart");
  }, []);

  useEffect(() => {
    // Change chart scale when zoom level is changed
    const transformValue = orgChartElRef.current.style.transform;
    if (transformValue.includes("scale")) {
      // Update current scale
      orgChartElRef.current.style.transform = transformValue.replace(
        /scale\([0-9.]+\)/,
        `scale(${zoomLevel})`
      );
    } else {
      // Append scale into current transform styles
      orgChartElRef.current.style.transform = `${transformValue} scale(${zoomLevel})`;
    }
  }, [zoomLevel]);

  return {
    zoomLevel,
    setZoomLevel,
  };
};

export default useChartZoom;
