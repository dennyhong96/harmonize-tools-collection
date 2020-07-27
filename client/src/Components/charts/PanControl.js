import React, { useEffect, useCallback } from "react";

import useChartPan from "../../hooks/useChartPan";
import "./PanControl.scss";

const PanControl = () => {
  const { setTranslateX, setTranslateY } = useChartPan("0", "0");

  const handlePanLeft = useCallback(() => {
    setTranslateX(
      (prev) => `translateX(${parseFloat(prev.match(/[-0-9]+/)[0]) - 100}px)`
    );
  }, [setTranslateX]);

  const handlePanRight = useCallback(() => {
    setTranslateX(
      (prev) => `translateX(${parseFloat(prev.match(/[-0-9]+/)[0]) + 100}px)`
    );
  }, [setTranslateX]);

  const handlePanUp = useCallback(() => {
    setTranslateY(
      (prev) => `translateY(${parseFloat(prev.match(/[-0-9]+/)[0]) - 100}px)`
    );
  }, [setTranslateY]);

  const handlePanDown = useCallback(() => {
    setTranslateY(
      (prev) => `translateY(${parseFloat(prev.match(/[-0-9]+/)[0]) + 100}px)`
    );
  }, [setTranslateY]);

  useEffect(() => {
    document.body.addEventListener("keydown", (evt) => {
      // Arrow keys to pan the chart
      if (evt.keyCode === 37) {
        evt.preventDefault();
        handlePanLeft();
      } else if (evt.keyCode === 39) {
        evt.preventDefault();
        handlePanRight();
      } else if (evt.keyCode === 40) {
        evt.preventDefault();
        handlePanDown();
      } else if (evt.keyCode === 38) {
        evt.preventDefault();
        handlePanUp();
      }
    });
  }, [handlePanLeft, handlePanRight, handlePanDown, handlePanUp]);

  return (
    <div className="pan">
      <button className="pan-up" onClick={handlePanUp}>
        <i className="fas fa-arrow-up"></i>
      </button>
      <div>
        <button className="pan-left" onClick={handlePanLeft}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <button className="pan-right" onClick={handlePanRight}>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
      <button className="pan-bottom" onClick={handlePanDown}>
        <i className="fas fa-arrow-down"></i>
      </button>
    </div>
  );
};

export default PanControl;
