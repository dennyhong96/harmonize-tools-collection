import { useEffect, useState, useRef } from "react";

const useChartPan = (initialX, initialY) => {
  const [translateX, setTranslateX] = useState(`${initialX}`);
  const [translateY, setTranslateY] = useState(`${initialY}`);

  const orgChartElRef = useRef(null);

  useEffect(() => {
    // Hook onto orgchart DOM element
    orgChartElRef.current = document.querySelector(".orgchart.myChart");
  }, []);

  useEffect(() => {
    const transformValue = orgChartElRef.current.style.transform;
    if (transformValue.includes("translateX")) {
      orgChartElRef.current.style.transform = transformValue.replace(
        /translateX\([0-9.px-]+\)/,
        translateX
      );
    } else {
      orgChartElRef.current.style.transform = `${transformValue} ${translateX}`;
    }
  }, [translateX]);

  useEffect(() => {
    const transformValue = orgChartElRef.current.style.transform;
    if (transformValue.includes("translateY")) {
      orgChartElRef.current.style.transform = transformValue.replace(
        /translateY\([0-9.px-]+\)/,
        translateY
      );
    } else {
      orgChartElRef.current.style.transform = `${transformValue} ${translateY}`;
    }
  }, [translateY]);

  return {
    translateX,
    setTranslateX,
    translateY,
    setTranslateY,
  };
};

export default useChartPan;
