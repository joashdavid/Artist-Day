"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { Reveal } from "./reveal";
import { artist, displayName, skills, stats } from "@/lib/artist";
import artwork from "@/lib/artwork-images.json";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value === 0) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-gold md:text-5xl">
      {value === 0 ? "0" : display}
      <span className="text-gold-2">{suffix}</span>
    </span>
  );
}

export function About() {
  return (
    <section id="artist" className="relative overflow-hidden py-28 md:py-36">
      {/* side glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[130px]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[5fr_6fr] lg:gap-20">
        {/* portrait */}
        <Reveal className="relative mx-auto w-full max-w-md lg:mx-0">
          <div
            className="absolute -inset-6 -z-10 rotate-[-4deg] rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/12 via-transparent to-violet/15"
            aria-hidden
          />
          <div className="card-frame group overflow-hidden rounded-xl border border-cream/12">
            <Image
              src={artwork["artist-portrait-1"].src}
              alt="A painter silhouette before a swirling night sky"
              width={artwork["artist-portrait-1"].w}
              height={artwork["artist-portrait-1"].h}
              sizes="(max-width: 500px) 90vw, 448px"
              className="h-auto w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          </div>
          {/* floating quote badge */}
          <motion.figure
            className="absolute -bottom-8 -right-3 max-w-[240px] rounded-xl border border-cream/12 bg-ink-2/95 p-5 shadow-2xl backdrop-blur md:-right-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Quote className="mb-2 size-5 fill-gold text-gold" aria-hidden />
            <blockquote className="font-display text-sm italic leading-snug text-cream/85">
              Every canvas is a journey — and every journey, a canvas.
            </blockquote>
          </motion.figure>
        </Reveal>

        {/* story */}
        <div>
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-[0.42em] text-gold md:text-xs">
                Behind the Easel
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl font-semibold leading-[1.1] text-cream md:text-5xl">
              A story told
              <br />
              <span className="text-gold-gradient italic">in colour</span>
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-cream/70 md:text-lg">
            <Reveal delay={0.14}>
              <p>
                Some people walk through the world — {displayName || "this artist"} repaints it.
                By day, a painter who mixes light out of pigment: skies that swirl, suns that
                hum, fields that seem to move if you look away. Every canvas carries the same
                signature — a refusal to let ordinary stay ordinary.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                And then, canvas left behind, the art simply changes rooms. As an event
                stylist, {displayName || "the artist"} composes celebrations the way great
                painters compose light — florals as brushstrokes, candlelight as glow, tables
                set like still-lifes guests never want to leave. It is the same eye, the same
                heart, one larger canvas.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p>
                {artist.name ? `${artist.name}, ` : ""}
                the world is measurably more beautiful with you in it — and today the
                internet agrees.
              </p>
            </Reveal>
          </div>

          {/* skills */}
          <Reveal delay={0.3}>
            <ul className="mt-9 flex flex-wrap gap-2.5" aria-label="Skills and mediums">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-cream/15 bg-ink-2/80 px-4 py-2 text-xs font-medium tracking-wide text-cream/75 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* stats */}
          <Reveal delay={0.36}>
            <div className="mt-12 grid grid-cols-3 divide-x divide-cream/10 border-y border-cream/10 py-8">
              {stats.map((s) => (
                <div key={s.label} className="px-4 text-center md:px-6">
                  {s.infinity ? (
                    <span className="font-display text-4xl font-semibold text-gold md:text-5xl">
                      ∞
                    </span>
                  ) : (
                    <Counter value={s.value} suffix={s.suffix} />
                  )}
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream/50 md:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
