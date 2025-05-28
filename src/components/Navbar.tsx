import React, { useContext, useState, useEffect, useRef } from "react";
import "@styles/Navbar.scss";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

/**
 * Navbar con "perritos animados" (Luki, Xopi, Sarki).
 *
 * Mejoras en esta versión:
 *   • Hover específico para cada ruta ⇒ muestra sprite …-happier.
 *   • **Idle universal**: ahora cada perrito (Luki, Xopi, Sarki) se balancea
 *     de izquierda a derecha cuando el usuario no interactúa.
 *   • Lógica de idle parametrizada via `idleFrames` en la configuración, de
 *     modo que añadir nuevos perritos es trivial.
 */

type DogConfig = {
  /** Sprite por defecto (quieto). */
  default: string;
  /** Sprite mostrado durante hover. */
  hover: string;
  /** Secuencia de frames para la animación de ladrido. */
  sequence: string[];
  /** Secuencia de dos frames para la animación idle (left / right). */
  idleFrames: [string, string];
  /** Sonido asociado al ladrido. */
  sound: string;
};

// ────────────────────────────────────────────────────────────
// Configuración centralizada de cada perrito por ruta
// ────────────────────────────────────────────────────────────
const dogAnimations: Record<string, DogConfig> = {
  "/": {
    default: "/dogs/luki-pixel.png",
    hover: "/dogs/luki-happier.png",
    idleFrames: ["/dogs/luki-left.png", "/dogs/luki-right.png"],
    sequence: [
      "/dogs/luki-pixel.png",
      "/dogs/luki-bark1.png",
      "/dogs/luki-bark2.png",
      "/dogs/luki-bark1.png",
      "/dogs/luki-pixel.png",
    ],
    sound: "/dog-bark.mp3",
  },
  "/cv": {
    default: "/dogs/xopi-pixel.png",
    hover: "/dogs/xopi-happier.png",
    idleFrames: ["/dogs/xopi-left.png", "/dogs/xopi-right.png"],
    sequence: [
      "/dogs/xopi-pixel.png",
      "/dogs/xopi-bark1.png",
      "/dogs/xopi-pixel.png",
    ],
    sound: "/xopi-barking.mp3",
  },
  "/projects": {
    default: "/dogs/sarki-pixel.png",
    hover: "/dogs/sarki-happier.png",
    idleFrames: ["/dogs/sarki-left.png", "/dogs/sarki-right.png"],
    sequence: [
      "/dogs/sarki-pixel.png",
      "/dogs/sarki-bark1.png",
      "/dogs/sarki-bark2.png",
      "/dogs/sarki-bark1.png",
      "/dogs/sarki-pixel.png",
    ],
    sound: "/dog-bark.mp3",
  },
};

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation();
  const route = location.pathname as keyof typeof dogAnimations;

  // ──────────────────────────────────────────────────────────
  // Estado y refs generales
  // ──────────────────────────────────────────────────────────
  const [isAnimating, setIsAnimating] = useState(false); // ladrido o idle
  const [isHovered, setIsHovered] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [currentImage, setCurrentImage] = useState(
    dogAnimations[route]?.default ?? dogAnimations["/"].default
  );

  const animationTimerRef = useRef<number | null>(null); // para ladrido/idle
  const idleTimerRef = useRef<number | null>(null); // para idle

  // ──────────────────────────────────────────────────────────
  // Efecto: reset al cambiar de ruta
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    // Limpiar timers activos
    if (animationTimerRef.current !== null) {
      clearInterval(animationTimerRef.current);
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    setIsAnimating(false);
    setIsVibrating(false);
    setCurrentImage(
      dogAnimations[route]?.default ?? dogAnimations["/"].default
    );
  }, [route]);

  // ──────────────────────────────────────────────────────────
  // Hover: sprite «happier» mientras el cursor esté encima y
  //         no haya otra animación en curso
  // ──────────────────────────────────────────────────────────
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isAnimating) {
      setCurrentImage(dogAnimations[route]?.hover ?? dogAnimations["/"].hover);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isAnimating) {
      setCurrentImage(
        dogAnimations[route]?.default ?? dogAnimations["/"].default
      );
    }
  };

  // ──────────────────────────────────────────────────────────
  // Ladrido al hacer click (bloquea navegación mientras dura)
  // ──────────────────────────────────────────────────────────
  const handleClick = () => {
    if (isAnimating) return; // ignorar si ya hay animación en curso

    // Cancelar idle mientras ladramos
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    const { sequence, sound } = dogAnimations[route] ?? dogAnimations["/"];
    new Audio(sound).play();

    setIsAnimating(true);

    // Animación especial de Xopi (vibración)
    if (route === "/cv") {
      setIsVibrating(true);
      setCurrentImage(sequence[1]); // ladrido

      animationTimerRef.current = window.setTimeout(() => {
        setCurrentImage(sequence[2]); // vuelve al pixel
        setIsVibrating(false);
        setIsAnimating(false);
      }, 1000);
      return;
    }

    // Animación general (bucle de frames)
    let index = 0;
    animationTimerRef.current = window.setInterval(() => {
      setCurrentImage(sequence[index]);
      index++;
      if (index === sequence.length) {
        clearInterval(animationTimerRef.current!);
        animationTimerRef.current = null;
        setIsAnimating(false);
      }
    }, 120);
  };

  // ──────────────────────────────────────────────────────────
  // Idle universal (todos los perritos)
  // ──────────────────────────────────────────────────────────
  const scheduleIdle = () => {
    if (isHovered || isAnimating) return;
    if (!dogAnimations[route]?.idleFrames) return; // por seguridad
    if (idleTimerRef.current !== null) return; // ya programado

    const delay = 3500 + Math.random() * 4500; // 3.5 – 8 s
    idleTimerRef.current = window.setTimeout(startIdleAnimation, delay);
  };

  const startIdleAnimation = () => {
    const idleFrames = dogAnimations[route]?.idleFrames;
    if (!idleFrames || isHovered || isAnimating) {
      idleTimerRef.current = null;
      scheduleIdle();
      return;
    }

    setIsAnimating(true); // bloquea navegación

    const [leftFrame, rightFrame] = idleFrames;
    const leftFirst = Math.random() < 0.5;
    const first = leftFirst ? leftFrame : rightFrame;
    const second = leftFirst ? rightFrame : leftFrame;

    setCurrentImage(first);

    // 0.5 s después, cambia al segundo frame
    animationTimerRef.current = window.setTimeout(() => {
      setCurrentImage(second);

      // 0.5 s después, vuelve al sprite por defecto y reprograma idle
      animationTimerRef.current = window.setTimeout(() => {
        setCurrentImage(dogAnimations[route].default);
        setIsAnimating(false);
        idleTimerRef.current = null;
        scheduleIdle();
      }, 500);
    }, 500);
  };

  // Gestiona la programación / cancelación del idle
  useEffect(() => {
    if (!isAnimating && !isHovered) {
      scheduleIdle();
    } else if (idleTimerRef.current !== null && (isAnimating || isHovered)) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, [isAnimating, isHovered, route]);

  // ──────────────────────────────────────────────────────────
  // Bloquea navegación mientras animamos (accesibilidad)
  // ──────────────────────────────────────────────────────────
  const maybeBlockNavigation = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (isAnimating) e.preventDefault();
  };

  // ──────────────────────────────────────────────────────────
  // Theme & language toggles
  // ──────────────────────────────────────────────────────────
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");

  // ──────────────────────────────────────────────────────────
  // Efecto: restaurar imagen correcta cuando termina la animación
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAnimating) {
      if (isHovered) {
        setCurrentImage(
          dogAnimations[route]?.hover ?? dogAnimations["/"].hover
        );
      } else {
        setCurrentImage(
          dogAnimations[route]?.default ?? dogAnimations["/"].default
        );
      }
    }
  }, [isAnimating, isHovered, route]);

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img
          src={currentImage}
          alt="Logo"
          className={`navbar-logo ${
            route === "/cv" ? "navbar-logo--xopi" : "navbar-logo--default"
          } ${isVibrating ? "navbar-logo--vibrate" : ""}`}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          draggable={false}
          style={{ cursor: "pointer" }}
        />

        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              onClick={maybeBlockNavigation}
              aria-disabled={isAnimating}
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              to="/cv"
              onClick={maybeBlockNavigation}
              aria-disabled={isAnimating}
            >
              {t("resume")}
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              onClick={maybeBlockNavigation}
              aria-disabled={isAnimating}
            >
              {t("projects")}
            </Link>
          </li>
        </ul>

        <div className="navbar-lang">
          <button onClick={toggleLanguage} disabled={isAnimating}>
            {i18n.language === "en" ? "🇬🇧" : "🇪🇸"}
          </button>
          <button onClick={toggleTheme} disabled={isAnimating}>
            {theme === "light" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
