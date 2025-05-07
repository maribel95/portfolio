// About.tsx
import React from "react";
import "@styles/About.scss";

const About: React.FC = () => {
  return (
    <section className="about">
      <div className="about__wrapper">
        <div className="about__text">
          <h3 className="about__heading">¿QUIERES SABER MÁS DE MÍ?</h3>
          <p className="about__description">
            Lo básico ya lo sabes, aquí te contaré qué me gusta y qué me
            inspira. Y cómo eso moldea mi forma de trabajar.
          </p>
          <p className="about__description">
            Desde siempre he jugado a baloncesto y he tenido la suerte de estar
            en diferentes equipos, llegando a entrenar con jugadoras de ligas
            semiprofesionales y una medalla olímpica.
          </p>
          <p className="about__description">
            He aguantado ritmos exigentes y he aprendido que el equipo siempre
            va primero.
          </p>
          <p className="about__description">
            He aguantado ritmos exigentes y he aprendido que el equipo siempre
            va primero. Y ademas he aprendido a disfrutar de cada momento, a no
            rendirme y a dar lo mejor de mí.
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
