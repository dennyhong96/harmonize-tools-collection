import React from "react";

const PanControl = ({ setTranslateX, setTranslateY }) => {
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
      <button onClick={handlePanLeft}>Left</button>
      <button onClick={handlePanRight}>Right</button>
      <button onClick={handlePanUp}>Up</button>
      <button onClick={handlePanDown}>Down</button>
    </div>
  );
};

export default PanControl;
