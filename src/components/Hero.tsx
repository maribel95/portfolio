import React from "react";
import "@styles/Hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="container">
          <h2 className="hero-greeting">Hi There! 👋</h2>
          <h1 className="hero-name">
            I'M <span className="highlight">MARIBEL CRESPI</span>
          </h1>
          <p className="hero-title">Frontend Developer</p>
        </div>

        <img
          src="/cute-chicken.svg"
          alt="Imagen presentación"
          className="hero-logo"
        />
      </div>
      <div className="bottom-hero-content">
        <div className="bottom-container">
          <h1>
            LET ME <span className="highlight">INTRODUCE</span> MYSELF
          </h1>
          <p className="bottom-description">
            I’m a passionate frontend developer with a love for clean design and
            intuitive user experiences. I enjoy turning ideas into real,
            interactive, and visually engaging web apps.
          </p>
          <p className="bottom-description">
            When I’m not coding, you can probably find me learning new tech,
            reading about design systems, or sketching layouts on napkins.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
