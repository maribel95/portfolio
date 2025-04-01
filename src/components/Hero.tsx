import React from "react";
import "@styles/Hero.scss";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="container">
          <h2 className="hero-greeting">{t("hero.greeting")} 👋</h2>
          <h1 className="hero-name">
            {t("hero.iam")} <span className="highlight">{t("hero.name")}</span>
          </h1>
          <p className="hero-title">{t("hero.title")}</p>
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
