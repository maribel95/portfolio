import React, { useState } from "react";
import "@styles/Navbar.scss";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
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
    }, 90); // cambia cada 150ms, puedes ajustar esto
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img
          src={currentImage}
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
