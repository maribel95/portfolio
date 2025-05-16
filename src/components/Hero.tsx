import "@styles/Hero.scss";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import CanvasParticles from "./CanvasParticles";
import SkillsSphere from "./SkillsSphere";
import React, { useState, useRef, useEffect, useMemo } from "react";

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activePanel, setActivePanel] = useState<
    "experience" | "skills" | "hobbies" | null
  >(null);

  const panelRef = useRef<HTMLDivElement>(null);

  // dentro del componente
  const experience = useMemo(
    () =>
      t("hero.quick-experience-description", {
        returnObjects: true,
      }) as string[],
    [t, i18n.language]
  );
  const hobbies = useMemo(
    () =>
      t("hero.quick-hobbies-description", { returnObjects: true }) as string[],
    [t, i18n.language]
  );

  function smoothScrollTo(targetY: number, duration = 1000): number {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;
    let rafId: number;

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
        rafId = window.requestAnimationFrame(step);
      }
    }

    rafId = window.requestAnimationFrame(step);
    return rafId; // ✅ devuelve el número para poder cancelarlo
  }

  useEffect(() => {
    if (!activePanel || !panelRef.current) return;
    const offsetTop =
      panelRef.current.getBoundingClientRect().top + window.scrollY;

    let rafId: number;
    const scroll = () => (rafId = smoothScrollTo(offsetTop - 260, 700));
    scroll();

    return () => cancelAnimationFrame(rafId);
  }, [activePanel]);

  return (
    <section className="hero-section">
      <CanvasParticles />
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
              A <span className="highlight">QUICK</span> INTRO
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
              <button
                className="hero-quick"
                onClick={() =>
                  setActivePanel((prev) =>
                    prev === "hobbies" ? null : "hobbies"
                  )
                }
              >
                {t("hero.quick-hobbies")}
              </button>
            </div>

            <div className="panel-wrapper">
              <div
                ref={panelRef}
                className={`panel-base ${activePanel ? "visible" : ""}`}
              >
                {activePanel === "experience" && (
                  <p>
                    {experience.map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )}

                {activePanel === "skills" && <SkillsSphere visible />}

                {activePanel === "hobbies" && (
                  <p>
                    {hobbies.map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
            <p className="bottom-wanna-know">{t("hero.bottom-wanna-know")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
