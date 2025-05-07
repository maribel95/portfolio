import { useEffect, useRef } from "react";
import "@styles/Background.scss";

const blobImages = [
  "/blobs/blob1.png",
  "/blobs/blob2.png",
  "/blobs/blob3.png",
  "/blobs/blob4.png",
  //"/blobs/blob5.png",
  //"/blobs/blob6.png",
  //"/blobs/blob7.png",
];
const Background = () => {
  const noiseRefA = useRef<HTMLDivElement>(null);
  const noiseRefB = useRef<HTMLDivElement>(null);

  const noiseImages = [
    "/noise/noise1.png",
    "/noise/noise2.png",
    "/noise/noise3.png",
    "/noise/noise4.png",
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  // Cambiar entre imagenes de ruido para crear un efecto de parpadeo en el fondo
  useEffect(() => {
    noiseImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let index = 0;
    let showingA = true;

    const interval = setInterval(() => {
      const currentImage = noiseImages[index];
      index = (index + 1) % noiseImages.length;

      const currentRef = showingA ? noiseRefA.current : noiseRefB.current;
      const otherRef = showingA ? noiseRefB.current : noiseRefA.current;

      if (currentRef && otherRef) {
        currentRef.style.backgroundImage = `url("${currentImage}")`;
        currentRef.style.opacity = "0.5";
        otherRef.style.opacity = "0";
      }

      showingA = !showingA;
    }, 100); // ajusta la velocidad a tu gusto

    return () => clearInterval(interval);
  }, []);

  // Colocar las imagenes de blob en posiciones aleatorias sin superposiciones
  useEffect(() => {
    const placed: { x: number; y: number; r: number }[] = [];

    const container = containerRef.current;
    if (!container) return;

    const blobs = container.querySelectorAll<HTMLImageElement>(".blob");

    // Esperar a que todas las imágenes estén cargadas
    Promise.all(
      Array.from(blobs).map(
        (blob) =>
          new Promise<void>((resolve) => {
            if (blob.complete) resolve();
            else blob.onload = () => resolve();
          })
      )
    ).then(() => {
      const placed: { x: number; y: number; r: number }[] = [];

      blobs.forEach((blob) => {
        let tries = 0;
        let placedSuccessfully = false;
        let x = 0,
          y = 0,
          r = blob.offsetWidth / 2 || 100;

        while (!placedSuccessfully && tries < 200) {
          x = Math.random() * (window.innerWidth - r * 2);
          const height = container.scrollHeight || window.innerHeight;
          y = Math.random() * (height - r * 2);

          const overlap = placed.some((b) => {
            const dx = b.x - x;
            const dy = b.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < b.r + r + 10;
          });

          if (!overlap) {
            placed.push({ x, y, r });
            blob.style.left = `${x}px`;
            blob.style.top = `${y}px`;
            placedSuccessfully = true;
          }
          tries++;
        }

        // Si no encuentra sitio, lo esconde (opcional)
        if (!placedSuccessfully) {
          blob.style.display = "none";
          console.warn("No se pudo colocar una burbuja sin solapamiento");
        }
      });
    });
  }, []);

  // Efecto de movimiento de blobs al mover el mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const blobs = document.querySelectorAll<HTMLImageElement>(".blob");
      blobs.forEach((blob) => {
        const rect = blob.getBoundingClientRect();
        const blobCenterX = rect.left + rect.width / 2;
        const blobCenterY = rect.top + rect.height / 2;

        const dx = mouseX - blobCenterX;
        const dy = mouseY - blobCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDisplacement = parseFloat(
          blob.dataset.maxDisplacement || "30"
        );

        const threshold = 300; // ⬅️ antes era 200, ahora aumentamos su "zona de reacción"

        if (distance < threshold) {
          const strength = (threshold - distance) / threshold;
          const moveX = (-dx / distance) * strength * maxDisplacement;
          const moveY = (-dy / distance) * strength * maxDisplacement;

          blob.style.setProperty("--mouse-x", `${moveX}px`);
          blob.style.setProperty("--mouse-y", `${moveY}px`);
        } else {
          blob.style.setProperty("--mouse-x", `0px`);
          blob.style.setProperty("--mouse-y", `0px`);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="background-container" ref={containerRef}>
      {blobImages.map((src, index) => (
        <img
          key={index}
          src={src}
          className="blob"
          alt={`blob-${index}`}
          data-max-displacement={(Math.random() * 20 + 20).toFixed(2)} // ya lo tienes
          data-float-speed={`${(Math.random() * 3 + 3).toFixed(2)}s`} // entre 3s y 6s
          data-float-scale={`${(Math.random() * 0.1 + 1).toFixed(2)}`} // entre 1 y 1.1
        />
      ))}

      <div className="noise-overlay noiseA" ref={noiseRefA}></div>
      <div className="noise-overlay noiseB" ref={noiseRefB}></div>
    </div>
  );
};

export default Background;
