import "@styles/Hero.scss";
import { useTranslation, Trans } from "react-i18next";
import CanvasParticles from "./CanvasParticles";
import SkillsSphere from "./SkillsSphere";
import React, { useState, useRef, useEffect, useMemo } from "react";

// 🖼️ Lista de imágenes clicables para el avatar.
// Añade aquí tantos nombres (sin extensión) como quieras y se irán rotando.
const heroImages = ["yo-excursion", "yo-baskin", "yo-perro"] as const;

type HeroImageName = (typeof heroImages)[number];

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();

  /* --------------------------------------------------
   * ESTADOS PRINCIPALES
   * -------------------------------------------------- */
  const [activePanel, setActivePanel] = useState<
    "experience" | "skills" | "hobbies" | null
  >(null);
  const [skillsMode, setSkillsMode] = useState<"sphere" | "list">("sphere");
  const [imageIndex, setImageIndex] = useState(0); // índice actual del avatar

  /* --------------------------------------------------
   * REFS Y CACHÉS DE TRADUCCIÓN
   * -------------------------------------------------- */
  const panelRef = useRef<HTMLDivElement>(null);
  const front = t("hero.skills-front", { returnObjects: true }) as string[];
  const back = t("hero.skills-back", { returnObjects: true }) as string[];
  const tools = t("hero.skills-tools", { returnObjects: true }) as string[];

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
  const skillsList = useMemo(() => {
    const raw = t("hero.skills-list", { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t, i18n.language]);

  /* --------------------------------------------------
   * PRE‑CARGA de imágenes para evitar parpadeos
   * -------------------------------------------------- */
  useEffect(() => {
    heroImages.forEach((name) => {
      const img = new Image();
      img.src = `/${name}.png`;
    });
  }, []);

  /* --------------------------------------------------
   * SCROLL SUAVE al abrir paneles
   * -------------------------------------------------- */
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
    return rafId; // para cancelarlo después
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

  /* --------------------------------------------------
   * RENDER AUXILIAR DE TECNOLOGÍAS
   * -------------------------------------------------- */
  function renderTech(tech: string) {
    return (
      <li key={tech}>
        <img src={`/logos/${tech}.png`} alt={tech} />
        <span>{tech.toUpperCase()}</span>
      </li>
    );
  }

  /* --------------------------------------------------
   * HANDLERS
   * -------------------------------------------------- */
  const handleAvatarClick = () => {
    // Avanza al siguiente índice de la lista circularmente
    setImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  /* Nombre y ruta de la imagen actual */
  const currentImageName: HeroImageName = heroImages[imageIndex];
  const currentImageSrc = `/${currentImageName}.png`;

  /* --------------------------------------------------
   * JSX PRINCIPAL
   * -------------------------------------------------- */
  return (
    <section className="hero-section">
      <CanvasParticles />

      {/* --------------------- Texto + Avatar --------------------- */}
      <div className="hero-flex">
        <div className="hero-text">
          <span className="line soy">{t("hero.iam")}</span>
          <span className="line nombre">MARIBEL</span>
          <span className="line apellido">CRESPI</span>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-logo">
            <div className="rotating-border" />
            {/* Avatar clicable que rota entre imágenes */}
            <img
              src={currentImageSrc}
              alt="Maribel"
              onClick={handleAvatarClick}
              className="clickable-avatar"
            />
          </div>

          {/* Texto "¡Hola!" manuscrito */}
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

      {/* --------------------- Sección inferior (intro, botones, paneles) --------------------- */}
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
            {/* Botones de acceso rápido */}
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

            {/* Panel desplegable */}
            <div className="panel-wrapper">
              <div
                ref={panelRef}
                className={`panel-base ${activePanel ? "visible" : ""} ${
                  activePanel === "skills" && skillsMode === "list"
                    ? "skills-list-bg"
                    : ""
                }`}
              >
                <div className="panel-inner">
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

                  {activePanel === "skills" && (
                    <>
                      <button
                        className="skills-toggle"
                        onClick={() =>
                          setSkillsMode((prev) =>
                            prev === "sphere" ? "list" : "sphere"
                          )
                        }
                        aria-label={
                          skillsMode === "sphere"
                            ? t("hero.show-list")
                            : t("hero.show-sphere")
                        }
                        title={
                          skillsMode === "sphere"
                            ? t("hero.show-list")
                            : t("hero.show-sphere")
                        }
                      >
                        {skillsMode === "sphere" ? "◧" : "◑"}
                      </button>

                      <div className="skills-box">
                        {skillsMode === "sphere" ? (
                          <SkillsSphere visible />
                        ) : (
                          <ul className="skills-grid">
                            <li className="cat">FRONT-END</li>
                            {front.map(renderTech)}

                            <li className="cat">BACK-END</li>
                            {back.map(renderTech)}

                            <li className="cat">TOOLS</li>
                            {tools.map(renderTech)}
                          </ul>
                        )}
                      </div>
                    </>
                  )}

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
            </div>

            <p className="bottom-wanna-know">{t("hero.bottom-wanna-know")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
