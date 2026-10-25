"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  hue: "gold" | "white" | "warm";
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

/**
 * A gentle canvas starfield — twinkling stars with the occasional
 * golden shooting star. Rendered above the hero painting.
 */
export function Starfield({ density = 0.00012 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let visible = false;
    let lastFrame = 0;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stars: Star[] = [];
    let comets: Comet[] = [];
    let nextCometAt = performance.now() + 3500;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Rasterize the glow once, rather than building gradients for every star/frame.
    const sprites = Object.fromEntries(
      Object.entries({ gold: "240,205,120", white: "245,248,255", warm: "255,230,200" }).map(([hue, color]) => {
        const sprite = document.createElement("canvas");
        sprite.width = sprite.height = 32;
        const brush = sprite.getContext("2d")!;
        const glow = brush.createRadialGradient(16, 16, 0, 16, 16, 16);
        glow.addColorStop(0, `rgba(${color},1)`);
        glow.addColorStop(0.2, `rgba(${color},0.9)`);
        glow.addColorStop(1, `rgba(${color},0)`);
        brush.fillStyle = glow;
        brush.fillRect(0, 0, 32, 32);
        return [hue, sprite];
      }),
    );

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      width = w;
      height = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(w < 768 ? 45 : 100, Math.floor(w * h * density));
      stars = Array.from({ length: count }, () => {
        const roll = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.7,
          baseAlpha: 0.35 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.1,
          hue: roll < 0.45 ? "gold" : roll < 0.8 ? "white" : "warm",
        };
      });
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - lastFrame < 1000 / 30) return;
      const delta = lastFrame ? Math.min((t - lastFrame) / (1000 / 60), 6) : 0;
      lastFrame = t;
      const w = width;
      const h = height;
      ctx.clearRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        const tw = s.baseAlpha * (0.55 + 0.45 * Math.sin(s.phase + t * 0.001 * s.speed));
        const size = s.r * 8;
        ctx.globalAlpha = tw;
        ctx.drawImage(sprites[s.hue], s.x - size / 2, s.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

      // spawn comets
      if (t > nextCometAt) {
        nextCometAt = t + 5000 + Math.random() * 6000;
        const fromLeft = Math.random() > 0.5;
        comets.push({
          x: fromLeft ? -40 : w * (0.3 + Math.random() * 0.7),
          y: h * (0.05 + Math.random() * 0.35),
          vx: (fromLeft ? 1 : -1) * (3.2 + Math.random() * 2),
          vy: 1.4 + Math.random() * 1.2,
          life: 0,
          maxLife: 90 + Math.random() * 40,
        });
      }

      // comets
      comets = comets.filter((c) => c.life < c.maxLife);
      for (const c of comets) {
        c.life += delta;
        c.x += c.vx * delta;
        c.y += c.vy * delta;
        const fade = Math.sin((c.life / c.maxLife) * Math.PI);
        const tail = 90;
        const g = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * tail * 0.16, c.y - c.vy * tail * 0.16);
        g.addColorStop(0, `rgba(244, 214, 140, ${0.85 * fade})`);
        g.addColorStop(1, "rgba(244, 214, 140, 0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * tail * 0.16, c.y - c.vy * tail * 0.16);
        ctx.stroke();

        ctx.fillStyle = `rgba(250, 235, 190, ${0.9 * fade})`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

    };

    const sync = () => {
      cancelAnimationFrame(raf);
      lastFrame = 0;
      comets = [];
      if (preference.matches) ctx.clearRect(0, 0, width, height);
      if (visible && !document.hidden && !preference.matches) {
        nextCometAt = performance.now() + 3500;
        raf = requestAnimationFrame(draw);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
