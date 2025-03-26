import React from "react";
import "@styles/Hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <h2 className="hero-greeting">Hi There! 👋</h2>
        <h1 className="hero-name">
          I'M <span className="highlight">MARIBEL CRESPI</span>
        </h1>
        <p className="hero-title">Frontend Developer</p>
      </div>

      {/* Imagen a la derecha */}
      <img src="/cute-chicken.svg" alt="logo" className="logo" />
    </section>
  );
};

export default Hero;
