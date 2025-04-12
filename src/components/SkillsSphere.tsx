import { useEffect } from "react";
import "@styles/SkillsSphere.scss";

type SkillsSphereProps = {
  visible: boolean;
};
const techs = [
  "react",
  "mysql",
  "nodejs",
  "java",
  "sass",
  "git",
  "spring",
  "jenkins",
  "python",
  "typescript",
  "vite",
  "c",
  "php",
  "go",
  "html",
  "mulesoft",
  "vscode",
  "figma",
  "canva",
  "postman",
];
const SkillsSphere: React.FC<SkillsSphereProps> = ({ visible }) => {
  useEffect(() => {
    if (!visible) {
      // Panel cerrado → detener canvas
      if (window.TagCanvas && window.TagCanvas.Delete) {
        try {
          window.TagCanvas.Delete("myCanvas");
        } catch (e) {
          console.error("TagCanvas delete error:", e);
        }
      }
      return;
    }

    // Cargar imágenes y arrancar TagCanvas (como ya tienes)
    const images = document.querySelectorAll("#tagList img");
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        startTagCanvas();
      }
    };

    images.forEach((imgEl) => {
      const img = imgEl as HTMLImageElement;
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", handleLoad);
        img.addEventListener("error", handleLoad);
      }
    });

    if (loadedCount === images.length) {
      startTagCanvas();
    }

    function startTagCanvas() {
      if (window.TagCanvas) {
        try {
          window.TagCanvas.Start("myCanvas", "tagList", {
            textColour: null,
            reverse: true,
            radius: 130,
            depth: 0.8,
            maxSpeed: 0.12,
            minSpeed: 0.08,
            decel: 0.4,
            dragControl: false,
            wheelZoom: false,
            weight: true,
            imageScale: 1,
            initial: [0, 0],
            outlineMethod: "none",
          });
        } catch (e) {
          console.error("TagCanvas error:", e);
        }
      }
    }

    return () => {
      images.forEach((imgEl) => {
        const img = imgEl as HTMLImageElement;
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleLoad);
      });
    };
  }, [visible]);

  return (
    <div className="skills-sphere">
      <canvas width="400" height="400" id="myCanvas">
        Your browser does not support canvas.
      </canvas>
      <div
        id="tagList"
        style={{ visibility: "hidden", position: "absolute", left: "-9999px" }}
      >
        <ul>
          {techs.map((tech) => (
            <li key={tech}>
              <a onClick={(e) => e.preventDefault()} role="presentation">
                <img
                  src={`/logos/${tech}.png`}
                  alt={tech.charAt(0).toUpperCase() + tech.slice(1)}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillsSphere;
