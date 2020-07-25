import React, { useEffect } from "react";

import "./ZoomControl.scss";

const ZoomControl = ({ setZoomLevel }) => {
  useEffect(() => {
    document.body.addEventListener("keydown", (evt) => {
      // + key to zoom in, - key to zoom out
      if (evt.keyCode === 189) {
        setZoomLevel((prev) => (prev - 0.2 >= 0.3 ? prev - 0.2 : 0.3));
      } else if (evt.keyCode === 187) {
        setZoomLevel((prev) => (prev + 0.2 <= 2 ? prev + 0.2 : 2));
      }
    });
  }, []);

  return (
    <div className="zoom">
      <button className="zoom-btn" onClick={() => setZoomLevel(0.3)}>
        <i class="fas fa-compress"></i>
      </button>
      <button
        className="zoom-btn"
        onClick={() =>
          setZoomLevel((prev) => (prev - 0.2 >= 0.3 ? prev - 0.2 : 0.3))
        }
      >
        <i class="fas fa-search-minus"></i>
      </button>
      <button className="zoom-btn" onClick={() => setZoomLevel(1)}>
        <i class="fas fa-eye"></i>
      </button>
      <button
        className="zoom-btn"
        onClick={() =>
          setZoomLevel((prev) => (prev + 0.2 <= 2 ? prev + 0.2 : 2))
        }
      >
        <i class="fas fa-search-plus"></i>
      </button>
      <button className="zoom-btn" onClick={() => setZoomLevel(2)}>
        <i class="fas fa-expand"></i>
      </button>
    </div>
  );
};

export default ZoomControl;
