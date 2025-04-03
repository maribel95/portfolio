import React from "react";
import "@styles/Hero.scss";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="hero-section">
      <div className="hero-flex">
        <div className="hero-text">
          <span className="line soy">SOY</span>
          <span className="line nombre">MARIBEL CRESPI</span>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-logo">
            <img src="/yo-baskin.png" alt="Maribel" />
          </div>
          <span className="hero-handwriting hola">¡Hola!</span>
        </div>
      </div>
      <div className="bottom-hero-content">
        <div className="bottom-container">
          <h1>
            <Trans i18nKey="hero.intro">
              LET ME <span className="highlight">INTRODUCE</span> MYSELF
            </Trans>
          </h1>
          <p className="bottom-description">{t("hero.description1")}</p>
          <p className="bottom-description">{t("hero.description2")}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
