import React from "react";
import "@styles/Hero.scss";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import Background from "./Background";

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="hero-section">
      <Background />
      <div className="hero-flex">
        <div className="hero-text">
          <span className="line soy">{t("hero.iam")}</span>
          <span className="line nombre">MARIBEL</span>
          <span className="line apellido">CRESPI</span>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-logo">
            <div className="rotating-border"></div>
            <img src="/yo-excursion.png" alt="Maribel" />
          </div>

          <span className="hero-handwriting hola" key={t("hero.greeting")}>
            {t("hero.greeting")
              .split("")
              .map((char, index) => (
                <span
                  className="char"
                  key={index}
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
          </span>
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
