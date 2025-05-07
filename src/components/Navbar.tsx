import React, { useContext, useState, useEffect } from "react";
import "@styles/Navbar.scss";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation(); // 👈 importante
  const route = location.pathname;
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

  // 🔁 Actualizar el perrito al cambiar de ruta
  useEffect(() => {
    setCurrentImage(
      dogAnimations[route]?.default || dogAnimations["/"].default
    );
  }, [route]);

  const handleClick = () => {
    const { sequence, sound } = dogAnimations[route] || dogAnimations["/"];
    const audio = new Audio(sound);
    audio.play();

    if (route === "/cv") {
      setIsVibrating(true);
      setCurrentImage(sequence[1]); // ladrido
      setTimeout(() => {
        setCurrentImage(sequence[2]); // volver al pixel
        setIsVibrating(false);
      }, 1000); // mantener ladrido durante 1 segundo
      return;
    }

    // Animación normal para el resto
    let index = 0;
    const interval = setInterval(() => {
      setCurrentImage(sequence[index]);
      index++;
      if (index === sequence.length) {
        clearInterval(interval);
      }
    }, 120); //130
  };

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
            <Link to="/">{t("home")}</Link>
          </li>
          <li>
            <Link to="/cv">{t("resume")}</Link>
          </li>
          <li>
            <Link to="/projects">{t("projects")}</Link>
          </li>
          {/* <li>
            <Link to="/about">{t("about")}</Link>
          </li> */}
        </ul>

        <div className="navbar-lang">
          <button onClick={toggleLanguage}>
            {i18n.language === "en" ? "🇬🇧" : "🇪🇸"}
          </button>
          <button onClick={toggleTheme}>
            {theme === "light" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
