// About.tsx
import React from "react";
import "@styles/About.scss";
import Background from "./Background";

const About: React.FC = () => {
  return (
    <section className="about">
      <div className="about__wrapper">
        <div className="about__text">
          <h3 className="about__heading">¿QUIERES SABER MÁS DE MÍ?</h3>
          <p className="about__description">
            Soy una persona apasionada por la tecnología, el diseño y la
            creatividad. Me encanta aprender cosas nuevas y buscar soluciones
            innovadoras para los desafíos que se presentan.
          </p>
        </div>
        <div className="about__image">
          <img src="/yo-baskin.png" alt="Maribel jugando a baskin" />
        </div>
      </div>
    </section>
  );
};

export default About;
