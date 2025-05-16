import React, { useContext, useState, useEffect, useRef } from "react";
import "@styles/Navbar.scss";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

/**
 * Navbar con "perritos animados".
 *   – Evita que la animación active se "cuelgue" al cambiar de ruta.
 *   – Si se hace click en un link mientras la animación sigue, se cancela
 *     el cambio (o la animación), para que nunca aparezca un logo incorrecto.
 */
const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation();
  const route = location.pathname;

  // refs para limpiar timers/intervals activos
  const timerRef = useRef<number | null>(null);

  /** Indica si hay animación en curso ⇒ bloquea navegación */
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);

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

  const [currentImage, setCurrentImage] = useState(
    dogAnimations[route]?.default || dogAnimations["/"].default
  );

  // ────────────────────────────────────────────────────────────
  // Limpia cualquier animación activa cuando la ruta cambia.
  // También restablece la imagen por defecto.
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsAnimating(false);
    setIsVibrating(false);
    setCurrentImage(
      dogAnimations[route]?.default || dogAnimations["/"].default
    );
  }, [route]);

  // ────────────────────────────────────────────────────────────
  // Maneja la animación del perrito.
  // ────────────────────────────────────────────────────────────
  const handleClick = () => {
    // Si ya está animando, ignoramos clics adicionales
    if (isAnimating) return;

    const { sequence, sound } = dogAnimations[route] || dogAnimations["/"];
    new Audio(sound).play();

    setIsAnimating(true);

    // Animación específica de Xopi (vibración + 1 ladrido)
    if (route === "/cv") {
      setIsVibrating(true);
      setCurrentImage(sequence[1]); // ladrido

      timerRef.current = window.setTimeout(() => {
        setCurrentImage(sequence[2]); // volver al pixel
        setIsVibrating(false);
        setIsAnimating(false);
        timerRef.current = null;
      }, 1000);
      return;
    }

    // Animación general (bucle de frames)
    let index = 0;
    timerRef.current = window.setInterval(() => {
      setCurrentImage(sequence[index]);
      index++;
      if (index === sequence.length) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setIsAnimating(false);
      }
    }, 120);
  };

  // Prevent navigation while animating (accessibility‑friendly)
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
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(nextLang);
  };

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
