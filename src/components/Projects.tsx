import { useState, useRef, useEffect } from "react";
import "@styles/Projects.scss";
import Background from "./Background";

const projects = [
  {
    title: "TFG",
    tech: ["Python", "IA", "LIME"],
    image: "/projects/tfg-en.jpeg",
    url: "https://github.com/maribel95/Bachelor-s-Degree-Final-Project",
  },
  {
    title: "File system",
    tech: ["C", "Makefile", "Shell"],
    image: "/projects/fileSystem.jpeg",
    url: "https://github.com/maribel95/Mini-File-System",
  },
  {
    title: "Machine learning",
    tech: [
      "Neural networks",
      "Deep learning",
      "Data analysis",
      "Jupiter Notebook",
    ],
    image: "/projects/machineLearning.jpeg",
    url: "https://github.com/maribel95/Machine-learning",
  },
  {
    title: "Data mining",
    tech: [
      "R",
      "Bayesian statistics",
      "Multivariable statistics",
      "Data science",
    ],
    image: "/projects/dataMining.jpeg",
    url: "https://github.com/maribel95/Data-mining-final-project",
  },
  {
    title: "Statistics NBA 2015",
    tech: [
      "R",
      "Statistical models",
      "Multivariable statistics",
      "Data science",
    ],
    image: "/projects/estadistica-es.jpeg",
    url: "https://github.com/maribel95/Statistical-project-NBA-Season-2015-2016",
  },
  {
    title: "Minishell",
    tech: ["C", "Makefile", "Shell", "Layered programming"],
    image: "/projects/minishell.jpeg",
    url: "https://github.com/maribel95/Mini-shell",
  },
  {
    title: "Concurrent programming",
    tech: ["Java", "Go", "Ada", "RabbitMQ"],
    image: "/projects/programacionConcurrente.jpeg",
    url: "https://github.com/maribel95/Concurrent-programming",
  },
  {
    title: "Super Tennis 68k",
    tech: ["Assembly", "Easy 68k"],
    image: "/projects/superTennis.jpeg",
    url: "https://github.com/maribel95/SUPER-TENNIS-68K",
  },
  {
    title: "Fishing game",
    tech: ["Java"],
    image: "/projects/fishingGame.jpeg",
    url: "https://github.com/maribel95/Practice-mini-fishing-game",
  },
  {
    title: "Goal based agent",
    tech: ["Java", "AI"],
    image: "/projects/marley.jpeg",
    url: "https://github.com/maribel95/Goal-based-agent",
  },
  {
    title: "PS-ECI emulator",
    tech: ["Assembly", "Easy68k"],
    image: "/projects/ps-eci.jpeg",
    url: "https://github.com/maribel95/PS-ECI-machine-emulator",
  },
  {
    title: "MineSweeper",
    tech: ["Java", "Video games"],
    image: "/projects/minesweeper.jpeg",
    url: "https://github.com/maribel95/Minesweeper-game",
  },
  {
    title: "Dashboard",
    tech: ["HTML5", "CSS", "JavaScript", "PHP"],
    image: "/projects/dashboard.jpeg",
    url: "https://github.com/maribel95/Dashboard",
  },
  {
    title: "Compiler",
    tech: ["Assembly", "Java", "Lex", "Data structures"],
    image: "/projects/compiler.jpeg",
    url: "https://github.com/maribel95/Compiler",
  },
  {
    title: "Advanced algorithms",
    tech: ["Java", "Algorithm design", "MVC", "Data structures"],
    image: "/projects/AA.jpeg",
    url: "https://github.com/maribel95/Advanced-algorithms",
  },
  {
    title: "Potigames",
    tech: ["HTML5", "CSS", "SASS", "Javascript"],
    image: "/projects/potigames.jpeg",
    url: "https://odilofortes.github.io",
  },
];

export default function Projects() {
  const [cursorY, setCursorY] = useState(0);
  const [animatedY, setAnimatedY] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [imageTop, setImageTop] = useState(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const EXTRA_RATIO = 0.2;

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);

    const el = itemRefs.current[index];
    const imageHeight = imageRef.current?.offsetHeight || 360;
    if (el) {
      const rect = el.getBoundingClientRect();
      let offset = rect.top + el.offsetHeight / 2 - imageHeight / 2; // Centrar verticalmente la imagen (180 = mitad de altura)
      // 👇  si es el último proyecto, aplica el desplazamiento extra
      if (index === projects.length - 1) {
        offset -= imageHeight * EXTRA_RATIO;
      }
      // Limita para que no se salga del viewport
      const minTop = 100;
      const maxTop = window.innerHeight - imageHeight - 20; // 360 = altura imagen
      const finalTop = Math.min(Math.max(offset, minTop), maxTop);

      setImageTop(finalTop);
    }
  };
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setAnimatedY((prevY) => {
        const delta = cursorY - prevY;
        return prevY + delta * 0.005;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCursorY(e.clientY);
  };
  return (
    <section className="projects">
      <Background />
      <div
        className="projects__container"
        onMouseMove={(e) => handleMouseMove(e)}
      >
        <div className="projects__list">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`projects__item ${
                activeIndex === index ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span className="projects__number">{index + 1}.</span>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects__name"
                  onClick={(e) => e.stopPropagation()} // opcional si hay otras interacciones
                >
                  {project.title}
                </a>
              ) : (
                <span className="projects__name">{project.title}</span>
              )}
              <div
                className="projects__tech"
                data-text={project.tech.join(" • ")}
              >
                {project.tech.join(" • ")}
              </div>
            </div>
          ))}
        </div>

        <div
          className="projects__preview"
          ref={previewRef}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <img
            ref={imageRef}
            src={activeIndex !== null ? projects[activeIndex].image : undefined}
            alt=""
            className={`projects__image ${
              activeIndex !== null ? "visible" : ""
            }`}
            onLoad={() => {
              if (activeIndex !== null) handleMouseEnter(activeIndex);
            }}
            style={{
              top: `${imageTop}px`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
