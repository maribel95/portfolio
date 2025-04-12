import { useState } from "react";
import "@styles/Projects.scss";

const projects = [
  {
    title: "Epikcart",
    tech: ["React", "Redux", "React i18n"],
    image: "/images/epikcart.png",
  },
  {
    title: "Resume Roaster",
    tech: ["GPT-4", "Next.js", "PostgreSQL"],
    image: "/images/resume-roaster.png",
  },
  {
    title: "Real Estate",
    tech: ["React.js", "Redux", "Tailwind CSS"],
    image: "/images/real-estate.png",
  },
  {
    title: "Consulting Finance",
    tech: ["HTML", "CSS & SCSS", "JavaScript"],
    image: "/images/consulting.png",
  },
  {
    title: "devLinks",
    tech: ["Next.js", "Formik", "Drag & Drop"],
    image: "/images/devlinks.png",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="projects">
      <div className="projects__container">
        <div className="projects__list">
          <h2 className="projects__title">Selected Projects</h2>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`projects__item ${
                activeIndex === index ? "active" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span className="projects__number">0{index + 1}.</span>
              <span className="projects__name">{project.title}</span>
              <div className="projects__tech">{project.tech.join(" • ")}</div>
            </div>
          ))}
        </div>
        <div className="projects__preview">
          {activeIndex !== null && (
            <img
              src={projects[activeIndex].image}
              alt={projects[activeIndex].title}
              className="projects__image"
            />
          )}
        </div>
      </div>
    </section>
  );
}
