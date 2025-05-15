import { useEffect, useRef } from "react";

const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const getCSSVariable = (name: string): string => {
      const el = document.body || document.documentElement;
      return getComputedStyle(el).getPropertyValue(name).trim();
    };

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = document.body.scrollHeight);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
    }[] = [];

    const particlesPerArea = 0.0002;
    let numParticles = Math.floor(width * height * particlesPerArea);

    const createParticles = () => {
      particles.length = 0;
      numParticles = Math.floor(width * height * particlesPerArea);

      for (let i = 0; i < numParticles; i++) {
        const hue = 240 + Math.random() * 60;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: `hsl(${hue}, 50%, 60%)`,
        });
      }
    };

    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const strokeColor =
        getCSSVariable("--canvas-stroke-lines") || "rgba(200, 200, 200, 0.1)";

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < numParticles; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = strokeColor;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const observer = new ResizeObserver(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.body.scrollHeight;
      createParticles();
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default CanvasParticles;
