import React, { useEffect, useRef, useCallback } from "react";

import useChartZoom from "../../hooks/useChartZoom";
import "./ZoomControl.scss";

const ZoomControl = () => {
  const { setZoomLevel, resetZoom } = useChartZoom(1);

  const zoomAvailableRef = useRef(true);
  const onKeyZoom = useCallback((evt) => {
    // + key to zoom in, - key to zoom out
    if (zoomAvailableRef.current) {
      if (evt.keyCode === 189) {
        evt.preventDefault();
        zoomAvailableRef.current = false;
        setZoomLevel((prev) => (prev - 0.2 >= 0.3 ? prev - 0.2 : 0.3));
      } else if (evt.keyCode === 187) {
        evt.preventDefault();
        zoomAvailableRef.current = false;
        setZoomLevel((prev) => (prev + 0.2 <= 2 ? prev + 0.2 : 2));
      }
      setTimeout(() => {
        zoomAvailableRef.current = true;
      }, 200);
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyZoom);
    return () => document.removeEventListener("keydown", onKeyZoom);
  }, []);

  return (
    <div className="zoom">
      <button className="zoom-btn" onClick={() => setZoomLevel(0.3)}>
        <i className="fas fa-compress"></i>
      </button>
      <button
        className="zoom-btn"
        onClick={() =>
          setZoomLevel((prev) => (prev - 0.2 >= 0.3 ? prev - 0.2 : 0.3))
        }
      >
        <i className="fas fa-search-minus"></i>
      </button>
      <button className="zoom-btn" onClick={() => setZoomLevel(1)}>
        <i className="fas fa-eye"></i>
      </button>
      <button
        className="zoom-btn"
        onClick={() =>
          setZoomLevel((prev) => (prev + 0.2 <= 2 ? prev + 0.2 : 2))
        }
      >
        <i className="fas fa-search-plus"></i>
      </button>
      <button className="zoom-btn" onClick={() => setZoomLevel(2)}>
        <i className="fas fa-expand"></i>
      </button>
    </div>
  );
};

export default ZoomControl;
