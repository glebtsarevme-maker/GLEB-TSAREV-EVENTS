import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface Particle {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  dispersedX: number;
  dispersedY: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  size: number;
  alpha: number;
  delayFactor: number;
}

interface DisintegratingPortraitProps {
  src: string;
}

type AnimationPhase = "idle" | "disintegrating" | "gone" | "orisit" | "reassembling" | "completed";

export default function DisintegratingPortrait({ src }: DisintegratingPortraitProps) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Read once-per-visit trigger state from sessionStorage on mount
  useEffect(() => {
    const triggered = sessionStorage.getItem("gleb_disintegrate_triggered");
    if (triggered === "true") {
      setPhase("completed");
    }
  }, []);

  // Set up the particles grid when disintegration starts
  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Use a clean temporary offscreen image to sample exact colors
    const sampleImg = new Image();
    sampleImg.crossOrigin = "anonymous";
    sampleImg.src = src;

    sampleImg.onload = () => {
      try {
        const offscreen = document.createElement("canvas");
        offscreen.width = 100;
        offscreen.height = 135;
        const oCtx = offscreen.getContext("2d");
        if (!oCtx) throw new Error("Offscreen context unavailable");
        
        oCtx.drawImage(sampleImg, 0, 0, offscreen.width, offscreen.height);
        const imgData = oCtx.getImageData(0, 0, offscreen.width, offscreen.height).data;

        const tempParticles: Particle[] = [];
        
        // Sampling grid metrics
        const cols = offscreen.width;
        const rows = offscreen.height;
        const stepX = width / cols;
        const stepY = height / rows;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const pixelIdx = (row * cols + col) * 4;
            const r = imgData[pixelIdx];
            const g = imgData[pixelIdx + 1];
            const b = imgData[pixelIdx + 2];
            const a = imgData[pixelIdx + 3];

            if (a < 50) continue; // Skip alpha pixels if transparent

            // Optimization: Skip very dark backgrounds to focus on highlights and midtones,
            // making the constellation look beautifully glowing and light.
            const brightness = (r + g + b) / 3;
            if (brightness < 20 && Math.random() > 0.1) continue;

            const originalX = col * stepX + stepX / 2;
            const originalY = row * stepY + stepY / 2;

            tempParticles.push({
              x: originalX,
              y: originalY,
              originalX,
              originalY,
              dispersedX: originalX,
              dispersedY: originalY,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -Math.random() * 3 - 0.5,
              r,
              g,
              b,
              size: Math.random() * 1.8 + 0.8,
              alpha: 1,
              delayFactor: Math.random() * 0.35, // Staggered delay for organic reassembly
            });
          }
        }
        
        particlesRef.current = tempParticles;
      } catch (e) {
        // Safe Elegant Fallback if canvas reading is blocked (CORS / sandbox)
        // Generates beautiful cybernetic neon-blue, white, and deep slate particles
        createFallbackParticles(width, height);
      }
    };

    sampleImg.onerror = () => {
      createFallbackParticles(width, height);
    };
  };

  const createFallbackParticles = (width: number, height: number) => {
    const tempParticles: Particle[] = [];
    const count = 3500;
    for (let i = 0; i < count; i++) {
      const originalX = Math.random() * width;
      const originalY = Math.random() * height;
      
      // Theme colors: 35% neon blue, 15% bright white/silver, 50% deep charcoal/dark blue
      const rand = Math.random();
      let r = 24, g = 24, b = 37; // dark slate
      if (rand < 0.35) {
        // Neon blue
        r = 96; g = 165; b = 250;
      } else if (rand < 0.5) {
        // Silver white
        r = 244; g = 244; b = 245;
      }

      tempParticles.push({
        x: originalX,
        y: originalY,
        originalX,
        originalY,
        dispersedX: originalX,
        dispersedY: originalY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 3 - 0.5,
        r,
        g,
        b,
        size: Math.random() * 1.5 + 0.8,
        alpha: 1,
        delayFactor: Math.random() * 0.35,
      });
    }
    particlesRef.current = tempParticles;
  };

  const handlePortraitClick = () => {
    // Only allow starting the animation from "idle" phase
    if (phase !== "idle") return;

    // Build the canvas resolution based on real bounding client rect to prevent scaling mismatch
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    // Initialize particles and kick off the state transition sequence
    initParticles();
    setPhase("disintegrating");
  };

  // Main canvas animation loop driven by standard phases
  useEffect(() => {
    if (phase === "idle" || phase === "completed") {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    let frameCount = 0;
    const disintegrationDuration = 110; // ~1.8 seconds at 60fps
    const reassemblyDuration = 120; // ~2.0 seconds for reassembly

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      if (phase === "disintegrating") {
        frameCount++;
        let anyVisible = false;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Applied physical vectors: micro-swirling wind carrying them upwards
          p.vx += Math.sin(p.y / 35 + frameCount * 0.05) * 0.08 + 0.06;
          p.vy -= 0.12 + p.size * 0.04; // rising parallax drift speed
          
          p.vx *= 0.97;
          p.vy *= 0.97;

          p.x += p.vx;
          p.y += p.vy;

          // Decay opacity gracefully
          p.alpha = Math.max(0, 1 - frameCount / disintegrationDuration);

          if (p.alpha > 0) {
            anyVisible = true;
            ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        }

        // Once disintegration is complete, transition to empty stage
        if (!anyVisible || frameCount >= disintegrationDuration) {
          // Store the dispersed endpoints before clearing canvas
          particles.forEach((p) => {
            p.dispersedX = p.x;
            p.dispersedY = p.y;
          });
          setPhase("gone");
        } else {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      } 
      else if (phase === "reassembling") {
        frameCount++;
        const progress = Math.min(1, frameCount / reassemblyDuration);

        // Smooth cubic-out easing curve for premium, snappy gravitational reassembly
        const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Stagger relative to delayFactor to give it a stellar constellation effect
          const staggeredProgress = Math.max(
            0,
            Math.min(1, (progress - p.delayFactor) / (1 - p.delayFactor))
          );
          const t = easeOutQuint(staggeredProgress);

          // Gently pull particles towards center and snap on origin coordinate
          const microNoise = (1 - t) * 8 * Math.cos(staggeredProgress * 12 + p.originalY);
          
          p.x = p.dispersedX + (p.originalX - p.dispersedX) * t + microNoise;
          p.y = p.dispersedY + (p.originalY - p.dispersedY) * t;
          p.alpha = staggeredProgress;

          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }

        if (progress >= 1) {
          // Lock transition completed once visitor is satisfied
          sessionStorage.setItem("gleb_disintegrate_triggered", "true");
          setPhase("completed");
        } else {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [phase]);

  // Handle stage timers for "Gone." (1s) -> "Or is it?" (1s) sequentially
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (phase === "gone") {
      timer1 = setTimeout(() => {
        setPhase("orisit");
      }, 1200);
    } else if (phase === "orisit") {
      timer2 = setTimeout(() => {
        setPhase("reassembling");
      }, 1200);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [phase]);

  const showInteractiveCursor = phase === "idle";

  return (
    <div className="relative w-full max-w-[380px] aspect-[3/4.2] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
      <motion.div
        ref={containerRef}
        onClick={handlePortraitClick}
        whileHover={showInteractiveCursor ? { scale: 1.015 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full h-full relative select-none ${showInteractiveCursor ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Backglow ambient aura */}
        <div className="absolute inset-0 bg-blue-500/5 filter blur-sm pointer-events-none" />

        {/* Cinematic Particles Canvas Wrapper */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-300 ${
            phase !== "idle" && phase !== "completed" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Regular HD Portrait Image - Hide during active particle simulation */}
        <img
          ref={imgRef}
          src={src}
          alt="Portrait of Gleb Tsarev holding a Jack of Spades"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover brightness-105 contrast-[1.02] transition-opacity duration-500 hover:scale-[1.02] ${
            phase !== "idle" && phase !== "completed" ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Typographical Intermission States (Centered Cinematic Text Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-25">
          <AnimatePresence mode="wait">
            {phase === "gone" && (
              <motion.span
                key="gone"
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl md:text-5xl text-white tracking-[0.25em] font-extralight uppercase text-glow"
              >
                {t("textGone")}
              </motion.span>
            )}

            {phase === "orisit" && (
              <motion.span
                key="orisit"
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl md:text-3xl text-[#60A5FA] tracking-[0.18em] font-light uppercase text-glow"
              >
                {t("textOrIsIt")}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Modern Minimal Layout Overlay Labels (Only visible when normal image is active to preserve mystery space) */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 flex flex-col justify-end transition-opacity duration-500 z-12 ${
            phase !== "idle" && phase !== "completed" ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex justify-between items-end border-t border-white/15 pt-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">{t("lblIllusionist")}</span>
              <span className="text-sm font-semibold text-white tracking-widest font-display">GLEB_TSAREV</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 border border-white/10 px-2 py-0.5 rounded">
              {t("lblJackOfSpades")}
            </span>
          </div>
        </div>

        {/* Elegant indicator tooltip to hint that it is interactive (only on first visit/idle) */}
        {phase === "idle" && (
          <div className="absolute top-4 right-4 bg-zinc-950/70 border border-white/10 px-2.5 py-1 rounded-md pointer-events-none transition-all duration-300 group-hover:bg-blue-950/60 group-hover:border-blue-500/30">
            <span className="font-mono text-[8px] tracking-[2px] text-[#60A5FA] uppercase font-bold animate-pulse">
              {t("lblTouch")}
            </span>
          </div>
        )}

        {/* Edge highlight styling layer */}
        <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-xl" />
      </motion.div>
    </div>
  );
}
