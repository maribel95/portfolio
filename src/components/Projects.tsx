import React from "react";

const projects = [
  {
    title: "Proyecto 1",
    description: "Descripción breve del proyecto 1.",
    link: "https://enlace-proyecto1.com",
  },
  {
    title: "Proyecto 2",
    description: "Descripción breve del proyecto 2.",
    link: "https://enlace-proyecto2.com",
  },
  {
    title: "Proyecto 3",
    description: "Descripción breve del proyecto 3.",
    link: "https://enlace-proyecto3.com",
  },
];

const Projects: React.FC = () => {
  return (
    <section>
      <h2>Mis Proyectos</h2>
      <div>
        {projects.map((project, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Ver Proyecto
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
