import "@styles/CV.scss"; // si usas estilos personalizados

function CV() {
  return (
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
        <h1>MARIBEL CRESPÍ VALERO </h1>
        <h2>INGENIERA BACKEND</h2>
        <p>
          Con casi un año de experiencia en desarrollo backend y habilidades
          sólidas en frontend, he trabajado en la creación y optimización de
          APIs y microservicios, mejorando la arquitectura y eficiencia de
          varios proyectos empresariales. Graduada en Ingeniería Informática con
          especialización en Inteligencia Artificial y Computación. En mi tiempo
          libre sigo formándome con libros, vídeos y cursos. Aporto una
          combinación de conocimientos técnicos y analíticos para resolver
          problemas complejos de manera eficaz.
        </p>
      </header>

      <section className="cv-section">
        <h3>EXPERIENCIA RECIENTE</h3>
        <p className="cv-position">Desarrolladora BackEnd en Grupo Piñero</p>
        <p className="cv-date">
          Enero 2024 - Octubre 2024 · 9 meses [Mallorca, España] [Industria
          Hotelera, B2B]
        </p>

        <h4>RESPONSABILIDADES</h4>
        <ul>
          <li>
            Desarrollo e implementación del back de un aplicativo web para la
            gestión de datos de las centrales de reserva de Grupo Piñero.
            Lenguaje Java y framework Spring Boot.
          </li>
          <li>Diseño e integración de APIs a través de MuleSoft...</li>
          <li>
            Manejo de herramientas y aplicaciones relacionadas con el ERP de
            Oracle.
          </li>
          <li>Control de versiones con Git y gestión de ramas con Git Flow.</li>
          <li>Optimización de consultas SQL.</li>
          <li>Manejo de pipelines de gestión de procesos con Jenkins.</li>
        </ul>

        <h4>LOGROS CLAVE</h4>
        <ul>
          <li>Creación y despliegue de +10 microservicios RESTful/SOAP.</li>
          <li>Optimización de funciones back-end en +5 proyectos distintos.</li>
          <li>
            Mejora de arquitectura incluyendo módulo MyBatis y estructura base
            reutilizable.
          </li>
        </ul>
      </section>

      <section className="cv-section">
        <h3>HABILIDADES</h3>
        <div className="cv-skills">
          <ul>
            <li>Trabajo en equipo</li>
            <li>Pensamiento abstracto</li>
            <li>Resolución de problemas</li>
            <li>Escucha activa</li>
            <li>Autónoma</li>
            <li>Aprendizaje rápido</li>
          </ul>
          <ul>
            <li>Planificación estratégica</li>
            <li>Pensamiento pragmático</li>
            <li>Adaptabilidad</li>
            <li>Organizada</li>
            <li>Metódica</li>
            <li>Disciplinada</li>
          </ul>
          <ul>
            <li>Java</li>
            <li>SQL</li>
            <li>PHP</li>
            <li>Python</li>
            <li>Javascript</li>
            <li>Programación orientada a objetos (OOP)</li>
          </ul>
        </div>
      </section>

      <section className="cv-section">
        <h3>EDUCACIÓN</h3>
        <p>
          <strong>Ingeniería informática</strong> – Universidad de las Islas
          Baleares (EPS-UIB)
        </p>
        <p>Sep 2019 - Sep 2023 [Mallorca, España]</p>
        <p>Especialización en inteligencia artificial y computación.</p>
      </section>

      <section className="cv-section">
        <h3>IDIOMAS</h3>
        <p>Español, Catalán e Inglés.</p>
      </section>
    </section>
  );
}

export default CV;
