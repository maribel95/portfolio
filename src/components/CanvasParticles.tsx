import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

// Densidad: nº de partículas por píxel cuadrado
const PARTICLES_PER_AREA = 0.00025;

function makeParticle(width: number, height: number): Particle {
  const hue = 240 + Math.random() * 60; // gama morada‑azulada
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    color: `hsl(${hue}, 60%, 70%)`,
  };
}

const CanvasParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // ---- tamaño inicial anclado al viewport ----
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // ---- crear el conjunto inicial ----
    const particles: Particle[] = [];
    const targetCount = () => Math.floor(width * height * PARTICLES_PER_AREA);
    for (let i = 0; i < targetCount(); i++) {
      particles.push(makeParticle(width, height));
    }

    // ---- bucle de animación ----
    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.1)";

      particles.forEach((p, i) => {
        // mover partícula
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // dibujar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // dibujar líneas con vecinas próximas
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 90 * 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      rafId = requestAnimationFrame(draw);
    };
    draw();

    // ---- responder a cambios de tamaño de la ventana ----
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const desired = targetCount();
      if (desired > particles.length) {
        for (let i = particles.length; i < desired; i++) {
          particles.push(makeParticle(width, height));
        }
      } else if (desired < particles.length) {
        particles.length = desired;
      }
    };
    window.addEventListener("resize", handleResize);

    // ---- limpieza ----
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default CanvasParticles;
