import React, { useContext, useState } from "react";
import "@styles/Navbar.scss";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@context/ThemeContext"; // usa la ruta correcta según tus alias

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

  // ⭐ Cambiar de tema y guardar en localStorage automáticamente
  const toggleTheme = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "fun" : "light";

    setTheme(nextTheme);
  };
  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(nextLang);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img
          src={currentImage}
          alt="Logo"
          className="navbar-logo"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />

        <ul className="navbar-menu">
          <li>
            <a href="#home">{t("home")}</a>
          </li>
          <li>
            <a href="#about">{t("about")}</a>
          </li>
          <li>
            <a href="#projects">{t("projects")}</a>
          </li>
          <li>
            <a href="#resume">{t("resume")}</a>
          </li>
          <li>
            <a href="#blogs">{t("blogs")}</a>
          </li>
        </ul>

        <div className="navbar-lang">
          <button onClick={toggleLanguage}>
            {i18n.language === "en" ? "🇬🇧" : "🇪🇸"}
          </button>
          <button onClick={toggleTheme}>
            {theme === "light" && "☀️"}
            {theme === "dark" && "🌙"}
            {theme === "fun" && "✨"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
