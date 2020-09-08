import React from "react";
import { useTheme } from "@material-ui/core";
import Particles from "react-particles-js";

const _Particles = () => {
  const theme = useTheme();
  return (
    <Particles
      style={{
        position: "absolute",
        opacity: 0.35,
        left: 0,
        right: 0,
        zIndex: -1,
      }}
      height="21rem"
      width="100%"
      params={{
        particles: {
          number: {
            value: 80,
            density: {
              enable: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              speed: 4,
              size_min: 0.3,
            },
          },
          color: theme.palette.primary.main,
          line_linked: {
            enable: false,
          },
          move: {
            random: true,
            speed: 1,
            direction: "top",
            out_mode: "out",
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "bubble",
            },
            onclick: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            bubble: {
              distance: 250,
              duration: 2,
              size: 0,
              opacity: 0,
            },
            repulse: {
              distance: 400,
              duration: 4,
            },
          },
        },
      }}
    />
  );
};

export default _Particles;
