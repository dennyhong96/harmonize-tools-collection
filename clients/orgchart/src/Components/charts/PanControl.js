import React, { useEffect, useCallback, useRef } from "react";

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

  const handleReset = useCallback(() => {
    setTranslateY("translateY(0)");
    setTranslateX("translateX(0)");
  }, [setTranslateX, setTranslateY]);

  const panAvailableRef = useRef(true);

  const onKeyPan = useCallback((evt) => {
    // Arrow keys to pan the chart
    if (panAvailableRef.current) {
      if (evt.keyCode === 37) {
        evt.preventDefault();
        panAvailableRef.current = false;
        handlePanLeft();
      } else if (evt.keyCode === 39) {
        evt.preventDefault();
        panAvailableRef.current = false;
        handlePanRight();
      } else if (evt.keyCode === 40) {
        evt.preventDefault();
        panAvailableRef.current = false;
        handlePanDown();
      } else if (evt.keyCode === 38) {
        evt.preventDefault();
        panAvailableRef.current = false;
        handlePanUp();
      }
      setTimeout(() => {
        panAvailableRef.current = true;
      }, 200);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", onKeyPan);
    return () => document.removeEventListener("keydown", onKeyPan);
  }, []);

  return (
    <div className="pan">
      <button className="pan-up" onClick={handlePanUp}>
        <i className="fas fa-arrow-up"></i>
      </button>
      <div>
        <button className="pan-left" onClick={handlePanLeft}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <button className="reset" onClick={handleReset}>
          <i className="fas fa-street-view"></i>
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
