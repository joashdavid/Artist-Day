"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Starfield } from "./starfield";
import { displayName } from "@/lib/artist";
import artwork from "@/lib/artwork-images.json";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.35 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* painting backdrop with parallax */}
      <motion.div style={{ y: reduceMotion ? 0 : bgY, scale: 1.12 }} className="absolute inset-0 will-change-transform">
        <motion.div
          initial={false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={artwork.hero.src}
            alt="A swirling starry night painted in deep blues and golds"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/35 to-ink" aria-hidden />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_60%_55%_at_50%_48%,rgba(10,13,22,0.18),rgba(10,13,22,0.82))]" aria-hidden />

      {/* twinkling stars */}
      <Starfield />

      {/* content */}
      <motion.div
        variants={container}
        initial={false}
        animate="show"
        style={{ opacity: reduceMotion ? 1 : fade }}
        className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-32 text-center"
      >
        <motion.div variants={item} className="mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold/70 md:w-20" aria-hidden />
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.45em] text-gold md:text-xs">
            <Sparkles className="size-4" aria-hidden />
            Happy Artist Day
            <Sparkles className="size-4" aria-hidden />
          </span>
          <span className="h-px w-12 bg-gold/70 md:w-20" aria-hidden />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[2.7rem] leading-[1.06] font-semibold text-cream sm:text-6xl md:text-7xl lg:text-[5.2rem]"
        >
          {displayName ? (
            <>
              For <span className="text-gold-gradient italic">{displayName}</span>,
              <br />
              who paints with light
            </>
          ) : (
            <>
              For the artist who
              <br />
              <span className="text-gold-gradient italic">paints with light</span>
            </>
          )}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg"
        >
          This little corner of the internet was made with love — to celebrate your
          brushstrokes, your eye for beauty, and every world you have ever built,
          on canvas and far beyond it.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#gallery"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-gold-2 hover:shadow-[0_0_40px_rgba(228,185,91,0.5)]"
          >
            Enter the gallery
            <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
          </a>
          <a
            href="#letter"
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-cream/90 backdrop-blur-sm transition-all duration-300 hover:border-gold/70 hover:text-gold"
          >
            A letter for you
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#gallery"
        aria-label="Scroll to gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: reduceMotion ? 0 : [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-cream/60"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.4em]">Scroll</span>
          <span className="h-10 w-px overflow-hidden bg-cream/20">
            <motion.span
              className="block h-4 w-px bg-gold"
              animate={{ y: reduceMotion ? 0 : [0, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn" }}
            />
          </span>
        </motion.div>
      </motion.a>
    </section>
  );
}
