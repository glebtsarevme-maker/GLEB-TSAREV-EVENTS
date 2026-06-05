import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse coordinates
  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-0.5 to 0.5)
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Watch resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class for beautiful floating specks of light
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      seed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulseSpeed = Math.random() * 0.005 + 0.002;
        this.seed = Math.random() * 100;
      }

      update(mx: number, my: number) {
        this.x += this.speedX + mx * 0.2;
        this.y += this.speedY + my * 0.2;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Pulse opacity slightly
        this.opacity = (Math.sin(Date.now() * this.pulseSpeed + this.seed) * 0.15) + 0.25;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(96, 165, 250, ${this.opacity})`;
        c.shadowColor = "rgba(96, 165, 250, 0.4)";
        c.shadowBlur = 5;
        c.fill();
        c.shadowBlur = 0; // reset
      }
    }

    const particles: Particle[] = Array.from({ length: 65 }, () => new Particle());

    const render = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Render subtle background gradients depending on mouse to give standard luxury look
      const mx = smoothMouseX.get();
      const my = smoothMouseY.get();

      // Ambient radial glow center relative to mouse
      const gradient = ctx.createRadialGradient(
        width / 2 + mx * width * 0.3,
        height / 2 + my * height * 0.3,
        50,
        width / 2 + mx * width * 0.3,
        height / 2 + my * height * 0.3,
        width * 0.8
      );
      gradient.addColorStop(0, "rgba(8, 17, 31, 0.65)");
      gradient.addColorStop(0.5, "rgba(5, 5, 5, 0.95)");
      gradient.addColorStop(1, "#050505");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw elegant grid pattern with horizontal lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;

      // Draw subtle responsive geometric structures representing impossible spaces
      const lineYPercent = 0.5 + my * 0.05;
      const originX = width / 2 + mx * 50;
      const originY = height * lineYPercent;

      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const radius = (width * 0.2) + i * (width * 0.08);
        ctx.arc(originX, originY, radius, 0, Math.PI * 2);
      }
      ctx.stroke();

      // Update and draw floating particles
      particles.forEach((particle) => {
        particle.update(mx, my);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothMouseX, smoothMouseY, mouseX, mouseY]);

  return (
    <div id="ambient-overlay" className="fixed inset-0 -z-20 w-full h-full overflow-hidden pointer-events-none bg-[#050505]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#08111F]/10 to-[#050505]/40 pointer-events-none" />
    </div>
  );
}
