import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "@styles/Footer.scss";
import { useTranslation } from "react-i18next";
const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer className="footer">
      <h2 className="footer__title">{t("footer.title")}</h2>
      <p className="footer__subtitle">{t("footer.subtitle")}</p>
      <div className="footer__icons">
        <a
          href="https://github.com/maribel95"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/maribelcrespi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/maribelcr5/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
      <div className="footer__bottom">
        <p>{t("footer.bottom")} Maribel Crespí Valero</p>
        <p>© {new Date().getFullYear()} Maribel</p>
      </div>
    </footer>
  );
};

export default Footer;
