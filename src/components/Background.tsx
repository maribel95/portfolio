import { useEffect, useRef } from "react";
import "@styles/Background.scss";

const blobImages = ["/blob1.png", "/blob2.png", "/blob3.png", "/blob4.png"];
const Background = () => {
  const noiseRefA = useRef<HTMLDivElement>(null);
  const noiseRefB = useRef<HTMLDivElement>(null);

  const noiseImages = [
    "/noise1.png",
    "/noise2.png",
    "/noise3.png",
    "/noise4.png",
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
          y = Math.random() * (window.innerHeight - r * 2);

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

        const threshold = 200;

        if (distance < threshold) {
          const factor = ((threshold - distance) / threshold) * 10;
          const moveX = (-dx / distance) * factor;
          const moveY = (-dy / distance) * factor;

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
        <img key={index} src={src} className="blob" alt={`blob-${index}`} />
      ))}

      <div className="noise-overlay noiseA" ref={noiseRefA}></div>
      <div className="noise-overlay noiseB" ref={noiseRefB}></div>
    </div>
  );
};

export default Background;
