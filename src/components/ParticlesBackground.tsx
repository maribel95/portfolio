import Particles from "@tsparticles/react";

const ParticlesBackground: React.FC = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "#0d0d0d" },
        particles: {
          number: { value: 100 },
          size: { value: { min: 1, max: 5 } },
          move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            straight: false,
          },
          opacity: { value: 0.7 },
          shape: {
            type: "circle",
          },
          color: { value: "#ffffff" },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
