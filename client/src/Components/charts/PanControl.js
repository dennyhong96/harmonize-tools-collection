import React, { useEffect } from "react";

import useChartPan from "../../hooks/useChartPan";
import "./PanControl.scss";

const PanControl = () => {
  const { setTranslateX, setTranslateY } = useChartPan("0", "0");

  useEffect(() => {
    document.body.addEventListener("keydown", (evt) => {
      // Arrow keys to pan the chart
      if (evt.keyCode === 37) {
        handlePanLeft();
      } else if (evt.keyCode === 39) {
        handlePanRight();
      } else if (evt.keyCode === 40) {
        handlePanDown();
      } else if (evt.keyCode === 38) {
        handlePanUp();
      }
    });
  }, []);

  const handlePanLeft = () => {
    setTranslateX(
      (prev) => `translateX(${parseFloat(prev.match(/[\-0-9]+/)[0]) - 100}px)`
    );
  };

  const handlePanRight = () => {
    setTranslateX(
      (prev) => `translateX(${parseFloat(prev.match(/[\-0-9]+/)[0]) + 100}px)`
    );
  };

  const handlePanUp = () => {
    setTranslateY(
      (prev) => `translateY(${parseFloat(prev.match(/[\-0-9]+/)[0]) - 100}px)`
    );
  };

  const handlePanDown = () => {
    setTranslateY(
      (prev) => `translateY(${parseFloat(prev.match(/[\-0-9]+/)[0]) + 100}px)`
    );
  };

  return (
    <div className="pan">
      <button className="pan-up" onClick={handlePanUp}>
        <i class="fas fa-arrow-up"></i>
      </button>
      <div>
        <button className="pan-left" onClick={handlePanLeft}>
          <i class="fas fa-arrow-left"></i>
        </button>
        <button className="pan-right" onClick={handlePanRight}>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <button className="pan-bottom" onClick={handlePanDown}>
        <i class="fas fa-arrow-down"></i>
      </button>
    </div>
  );
};

export default PanControl;
