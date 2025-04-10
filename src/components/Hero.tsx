import "@styles/Hero.scss";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import Background from "./Background";
import SkillsSphere from "./SkillsSphere";
import React, { useState, useRef, useEffect } from "react";

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activePanel, setActivePanel] = useState<
    "experience" | "skills" | null
  >(null);

  const experienceRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  const experience = t("hero.quick-experience-description", {
    returnObjects: true,
  }) as string[];

  function smoothScrollTo(targetY: number, duration = 1000) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const easeInOut =
        percent < 0.5
          ? 2 * percent * percent
          : -1 + (4 - 2 * percent) * percent;

      window.scrollTo(0, startY + distance * easeInOut);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    if (activePanel === "experience" && experienceRef.current) {
      experienceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (activePanel === "skills" && skillsRef.current) {
      const timeout = setTimeout(() => {
        const offsetTop =
          skillsRef.current!.getBoundingClientRect().top + window.scrollY;
        const extraPadding = 260;

        smoothScrollTo(offsetTop - extraPadding, 800);
      }, 100); // Esperamos a que la animación de skills haya terminado

      return () => clearTimeout(timeout);
    }
  }, [activePanel]);

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
                onClick={() =>
                  setActivePanel((prev) =>
                    prev === "experience" ? null : "experience"
                  )
                }
              >
                {t("hero.quick-experience")}
              </button>
              <button
                className="hero-quick"
                onClick={() =>
                  setActivePanel((prev) =>
                    prev === "skills" ? null : "skills"
                  )
                }
              >
                {t("hero.quick-skills")}
              </button>
              <button className="hero-quick">{t("hero.quick-hobbies")}</button>
            </div>

            <div
              ref={experienceRef}
              className={`experience-panel ${
                activePanel === "experience" ? "visible" : ""
              }`}
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

            <div
              ref={skillsRef}
              className={`skills-panel ${
                activePanel === "skills" ? "visible" : ""
              }`}
            >
              <SkillsSphere visible={activePanel === "skills"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
