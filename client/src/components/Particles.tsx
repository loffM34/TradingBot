import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; //loads tsparticles slim
//import { loadFull } from "tsparticles"; // loads ts particles
import { useCallback, useMemo } from "react";
const ParticlesComponent = () => {
  const options = useMemo(() => {
    //empty options will load default options settings
    return {
      background: {
        color: "#020d29", //canvas background color
      },
      fullScreen: {
        enable: true, //particles will fill screen
        zIndex: 0,
        autoPlay: true,
      },

      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        modes: {
          push: {
            quantity: 5, //amount created on each click
          },
          repulse: {
            radius: 100, //repulse radius on click event
          },
        },
      },
      particles: {
        links: {
          enable: true, //enables particles links
          distance: 200, //linking distance for particles
        },
        number: {
          value: 25,
        },
        move: {
          enable: true, //enabling this will make particles move in canvas
          speed: { min: 1, max: 3 },
        },
        opacity: {
          value: { min: 0.3, max: 0.7 }, // changes transparency
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
    };
  }, []);

  const particlesInit = useCallback(async (engine) => {
    loadSlim(engine);
  }, []);

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticlesComponent;
