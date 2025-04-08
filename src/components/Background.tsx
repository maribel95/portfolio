import { useEffect, useRef } from "react";
import "@styles/Background.scss";

const Background = () => {
  const noiseRefA = useRef<HTMLDivElement>(null);
  const noiseRefB = useRef<HTMLDivElement>(null);

  const noiseImages = [
    "/noise1.png",
    "/noise2.png",
    "/noise3.png",
    "/noise4.png",
  ];

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const blobs = document.querySelectorAll<HTMLImageElement>(".blob");
      blobs.forEach((blob, index) => {
        const rect = blob.getBoundingClientRect();
        const blobCenterX = rect.left + rect.width / 2;
        const blobCenterY = rect.top + rect.height / 2;

        const dx = mouseX - blobCenterX;
        const dy = mouseY - blobCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const threshold = 200; // px

        if (distance < threshold) {
          const factor = ((threshold - distance) / threshold) * 10; // escala del efecto
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
    <div className="background-container">
      <img src="/blob1.png" className="blob blob1" alt="blob" />
      <img src="/blob2.png" className="blob blob2" alt="blob" />
      <img src="/blob3.png" className="blob blob3" alt="blob" />
      <img src="/blob4.png" className="blob blob4" alt="blob" />

      <div className="noise-overlay noiseA" ref={noiseRefA}></div>
      <div className="noise-overlay noiseB" ref={noiseRefB}></div>
    </div>
  );
};

export default Background;
