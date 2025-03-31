// src/components/Navbar.tsx
import React, { useState } from "react";
import "@styles/Navbar.scss";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const [isBarking, setIsBarking] = useState(false);
  const { t, i18n } = useTranslation();

  const handleClick = () => {
    const barkAudio = new Audio("/dog-bark.mp3");
    setIsBarking(true);
    barkAudio.play();

    setTimeout(() => {
      setIsBarking(false);
    }, 1000);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img
          src={isBarking ? "/luki-barking.png" : "/luki-pixel.png"}
          alt="Logo web"
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
          <button onClick={() => changeLanguage("en")}>🇬🇧</button>
          <button onClick={() => changeLanguage("es")}>🇪🇸</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
