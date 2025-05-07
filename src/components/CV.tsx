import { useTranslation } from "react-i18next";
import "@styles/CV.scss";
import i18n from "i18n";
function CV() {
  const { t } = useTranslation();
  const cvFile = i18n.language === "en" ? "/pdf/CV-EN.pdf" : "/pdf/CV-ES.pdf";

  return (
    <div className="cv-container">
      {/* <Background /> */}
      <section className="cv-html">
        <header className="cv-header">
          <p className="cv-contact">
            <a href="mailto:maribelcrespi5@gmail.com" rel="noreferrer">
              maribelcrespi5@gmail.com
            </a>{" "}
            -{" "}
            <a href="tel:+3462982539" rel="noreferrer">
              (+34) 629 82 53 39{" "}
            </a>{" "}
            -{" "}
            <a
              href="https://linkedin.com/in/maribelcrespi"
              target="_blank"
              rel="noreferrer"
            >
              /in/maribelcrespi/
            </a>{" "}
            -{" "}
            <a
              href="https://github.com/maribel95"
              target="_blank"
              rel="noreferrer"
            >
              github.com/maribel95
            </a>
          </p>
          <h1>MARIBEL CRESPÍ VALERO</h1>
          <h2>{t("cv.title")}</h2>
          <p>{t("cv.summary")}</p>
        </header>

        <section className="cv-section">
          <h3>{t("cv.experience")}</h3>
          <p className="cv-position">
            {t("cv.position")} <span>{t("cv.company")}</span>
          </p>
          <p className="cv-date">{t("cv.date-range")}</p>

          <h4>{t("cv.responsibilitiesTitle")}</h4>
          <ul>
            {(
              t("cv.responsibilities", { returnObjects: true }) as string[]
            ).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>{t("cv.achievementsTitle")}</h4>
          <ul>
            {(t("cv.achievements", { returnObjects: true }) as string[]).map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </section>

        <section className="cv-section">
          <h3>{t("cv.skillsTitle")}</h3>
          <div className="cv-skills">
            {(t("cv.skills", { returnObjects: true }) as string[][]).map(
              (group, idx) => (
                <ul key={idx}>
                  {group.map((item, subidx) => (
                    <li key={subidx}>{item}</li>
                  ))}
                </ul>
              )
            )}
          </div>
        </section>

        <section className="cv-section">
          <h3>{t("cv.educationTitle")}</h3>
          <p className="cv-education">
            <strong>{t("cv.degree")}</strong> – {t("cv.university")}
          </p>
          <p>{t("cv.dates")}</p>
          <p>{t("cv.specialization")}</p>
        </section>

        <section className="cv-section">
          <h3>{t("cv.languagesTitle")}</h3>
          <p>{t("cv.languages")}</p>
        </section>
      </section>

      <div className="cv-download">
        <a href={cvFile} download className="cv-download-btn">
          ⬇️ {t("cv.download")}
        </a>
      </div>
    </div>
  );
}

export default CV;
