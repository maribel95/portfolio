import React, { useContext, useState } from "react";
import "@styles/Navbar.scss";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@context/ThemeContext";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  const [currentImage, setCurrentImage] = useState("/luki-pixel.png");

  const imageSequence = [
    "/luki-pixel.png",
    "/luki-bark1.png",
    "/luki-bark2.png",
    "/luki-bark3.png",
    "/luki-pixel.png",
  ];

  const handleClick = () => {
    const barkAudio = new Audio("/dog-bark.mp3");
    barkAudio.play();

    let index = 0;
    const interval = setInterval(() => {
      setCurrentImage(imageSequence[index]);
      index++;
      if (index === imageSequence.length) {
        clearInterval(interval);
      }
    }, 150);
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
          className="navbar-logo"
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
            <a href="#about">{t("about")}</a>
          </li>
          <li>
            <a href="#projects">{t("projects")}</a>
          </li>
        </ul>

        <div className="navbar-lang">
          <button onClick={toggleLanguage}>
            {i18n.language === "en" ? "🇬🇧" : "🇪🇸"}
          </button>
          <button onClick={toggleTheme}>
            {theme === "light" && "☀️"}
            {theme === "dark" && "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
