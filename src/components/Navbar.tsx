import React, { useContext, useState, useEffect, useRef } from "react";
import "@styles/Navbar.scss";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

/**
 * Navbar con "perritos animados" (Luki, Xopi, Sarki).
 *
 * Novedades respecto a la versión anterior:
 *   1. Hover  ⇒ muestra luki‑happier mientras el cursor esté encima.
 *   2. Idle   ⇒ cada 3.5 – 8 s (aleatorio) Luki mira a un lado y acto
 *                seguido al otro (luki‑left → luki‑right o viceversa).
 *   3. El ciclo idle se pausa durante hover o durante la animación de
 *      ladrido, y se reanuda de forma limpia al terminar.
 */
const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation();
  const route = location.pathname;

  // ────────────────────────────────────────────────────────────
  // Estado y refs generales
  // ────────────────────────────────────────────────────────────
  const [isAnimating, setIsAnimating] = useState(false); // ladrido o idle
  const [isHovered, setIsHovered] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [currentImage, setCurrentImage] = useState("/dogs/luki-pixel.png");

  const animationTimerRef = useRef<number | null>(null); // para ladrido/idle
  const idleTimerRef = useRef<number | null>(null); // solo para idle

  // ────────────────────────────────────────────────────────────
  // Definición de sprites y secuencias
  // ────────────────────────────────────────────────────────────
  const dogAnimations: Record<
    string,
    { default: string; sequence: string[]; sound: string }
  > = {
    "/": {
      default: "/dogs/luki-pixel.png",
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
      sequence: [
        "/dogs/xopi-pixel.png",
        "/dogs/xopi-bark1.png",
        "/dogs/xopi-pixel.png",
      ],
      sound: "/xopi-barking.mp3",
    },
    "/projects": {
      default: "/dogs/sarki-pixel.png",
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

  // ────────────────────────────────────────────────────────────
  // Efecto: reset al cambiar de ruta
  // ────────────────────────────────────────────────────────────
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
      dogAnimations[route]?.default || dogAnimations["/"].default
    );
  }, [route]);

  // ────────────────────────────────────────────────────────────
  // Hover: luki‑happier mientras cursor encima y sin animación
  // ────────────────────────────────────────────────────────────
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isAnimating && route === "/") {
      setCurrentImage("/dogs/luki-happier.png");
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isAnimating && route === "/") {
      setCurrentImage("/dogs/luki-pixel.png");
    }
  };

  // ────────────────────────────────────────────────────────────
  // Ladrido al hacer click (bloquea navegación mientras dura)
  // ────────────────────────────────────────────────────────────
  const handleClick = () => {
    if (isAnimating) return; // ignorar si ya hay animación en curso

    // Cancelar idle mientras ladramos
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    const { sequence, sound } = dogAnimations[route] || dogAnimations["/"];
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

  // ────────────────────────────────────────────────────────────
  // Idle: Luki mira a un lado y luego al otro cada 3.5–8 s
  // ────────────────────────────────────────────────────────────
  const scheduleIdle = () => {
    // Únicamente en la home y si no hay hover ni otras animaciones
    if (route !== "/" || isHovered || isAnimating) {
      return;
    }
    if (idleTimerRef.current !== null) return; // ya programado

    const delay = 3500 + Math.random() * 4500; // 3.5 – 8 s
    idleTimerRef.current = window.setTimeout(() => {
      startIdleAnimation();
    }, delay);
  };

  const startIdleAnimation = () => {
    if (route !== "/" || isHovered || isAnimating) {
      idleTimerRef.current = null;
      scheduleIdle();
      return;
    }

    setIsAnimating(true); // bloquea navegación

    const leftFirst = Math.random() < 0.5;
    const first = leftFirst ? "/dogs/luki-left.png" : "/dogs/luki-right.png";
    const second = leftFirst ? "/dogs/luki-right.png" : "/dogs/luki-left.png";

    setCurrentImage(first);

    // 0.4 s después, cambia al segundo frame
    animationTimerRef.current = window.setTimeout(() => {
      setCurrentImage(second);

      // 0.4 s después, vuelve al pixel y reprograma idle
      animationTimerRef.current = window.setTimeout(() => {
        setCurrentImage("/dogs/luki-pixel.png");
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

  // ────────────────────────────────────────────────────────────
  // Bloquea navegación mientras animamos (accesibilidad)
  // ────────────────────────────────────────────────────────────
  const maybeBlockNavigation = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (isAnimating) {
      e.preventDefault();
    }
  };

  // ────────────────────────────────────────────────────────────
  // Theme & language toggles
  // ────────────────────────────────────────────────────────────
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  useEffect(() => {
    // Solo nos interesa actuar CUANDO la animación ha terminado
    if (!isAnimating) {
      if (isHovered && route === "/") {
        setCurrentImage("/dogs/luki-happier.png");
      } else {
        setCurrentImage(
          dogAnimations[route]?.default || dogAnimations["/"].default
        );
      }
    }
  }, [isAnimating, isHovered, route]);
  // ────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────
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
          onMouseEnter={() => {
            setIsHovered(true); // ← guardamos que el cursor está encima
            if (!isAnimating && route === "/") {
              setCurrentImage("/dogs/luki-happier.png");
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false); // ← ya no está encima
            if (!isAnimating && route === "/") {
              setCurrentImage("/dogs/luki-pixel.png");
            }
          }}
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
