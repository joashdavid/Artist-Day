"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { displayName, paintings } from "@/lib/artist";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i === null ? i : (i + dir + paintings.length) % paintings.length)),
    []
  );

  // keyboard navigation + scroll lock
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active !== null ? paintings[active] : null;

  return (
    <section id="gallery" className="relative overflow-hidden py-28 md:py-36">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="The Collection"
          title={
            <>
              Brushstrokes of a <span className="text-gold-gradient italic">Beautiful Mind</span>
            </>
          }
          sub={`Seven windows into the way ${displayName || "the artist"} sees the world — swirls, impossible sunsets and light that refuses to sit still. Tap any piece to step closer.`}
        />

        {/* masonry grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {paintings.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 0.1} className="mb-6 break-inside-avoid">
              <motion.button
                type="button"
                onClick={() => setActive(i)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="card-frame group relative block w-full overflow-hidden rounded-xl border border-cream/10 bg-ink-2 text-left focus-visible:outline-2 focus-visible:outline-gold"
                aria-label={`View painting: ${p.title}`}
              >
                <div className="relative p-2.5">
                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      src={p.src}
                      alt={`${p.title} — ${p.medium}`}
                      width={p.w}
                      height={p.h}
                      sizes="(max-width: 639px) calc(100vw - 60px), (max-width: 1023px) 45vw, (max-width: 1279px) 30vw, 370px"
                      className="h-auto w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                    />
                    {/* hover veil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                        {p.medium}
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold text-cream">
                        {p.title}
                      </p>
                    </div>
                    <span className="absolute right-3 top-3 grid size-9 translate-y-2 place-items-center rounded-full bg-ink/70 text-gold opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <Maximize2 className="size-4" aria-hidden />
                    </span>
                  </div>
                  {/* plaque */}
                  <div className="flex items-baseline justify-between px-2 pb-1.5 pt-3">
                    <span className="font-display text-base font-semibold text-cream/90">
                      {p.title}
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.22em] text-cream/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-xl md:p-10"
            onClick={close}
          >
            {/* close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 grid size-12 place-items-center rounded-full border border-cream/20 text-cream/80 transition-all hover:rotate-90 hover:border-gold hover:text-gold"
            >
              <X className="size-5" />
            </button>

            {/* prev / next */}
            <button
              type="button"
              aria-label="Previous painting"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream/80 transition-all hover:border-gold hover:text-gold md:left-8"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next painting"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream/80 transition-all hover:border-gold hover:text-gold md:right-8"
            >
              <ChevronRight className="size-5" />
            </button>

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="card-frame relative rounded-lg border border-gold/25 bg-ink-2 p-2.5 md:p-3">
                <Image
                  src={current.src}
                  alt={`${current.title} — ${current.medium}`}
                  width={current.w}
                  height={current.h}
                  sizes="(max-width: 768px) 92vw, 68vh"
                  priority
                  className="max-h-[62vh] w-auto max-w-full rounded-md object-contain md:max-h-[66vh]"
                />
              </div>
              <figcaption className="mt-6 max-w-xl text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
                  {current.medium} · {String((active ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(paintings.length).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-cream md:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-2 text-sm italic leading-relaxed text-cream/60">
                  {current.blurb}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("sr-only")} aria-live="polite">
        {current ? `Viewing ${current.title}` : ""}
      </div>
    </section>
  );
}
