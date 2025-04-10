import "@styles/Hero.scss";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import Background from "./Background";
import SkillsSphere from "./SkillsSphere";
import React, { useState } from "react";

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showExperience, setShowExperience] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const experience = t("hero.quick-experience-description", {
    returnObjects: true,
  }) as string[];

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
            🙌🏼
          </h1>
          <p className="bottom-description">{t("hero.description1")}</p>

          <div className="text-row-wrapper">
            <div className="text-row">
              <button
                className="hero-quick"
                onClick={() => setShowExperience(!showExperience)}
              >
                {t("hero.quick-experience")}
              </button>
              <button
                className="hero-quick"
                onClick={() => setShowSkills(!showSkills)}
              >
                {t("hero.quick-skills")}
              </button>
              <button className="hero-quick">{t("hero.quick-hobbies")}</button>
            </div>

            <div
              className={`experience-panel ${showExperience ? "visible" : ""}`}
            >
              <p>
                {experience.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            <div className={`skills-panel ${showSkills ? "visible" : ""}`}>
              {showSkills && <SkillsSphere visible={showSkills} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
