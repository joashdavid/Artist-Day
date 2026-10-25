"use client";

import { motion } from "framer-motion";
import { Feather, Heart, Palette } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { toName } from "@/lib/artist";

export function Letter() {
  return (
    <section id="letter" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="From All of Us"
          title={
            <>
              A letter, <span className="text-gold-gradient italic">for you</span>
            </>
          }
        />

        {/* paper letter */}
        <Reveal className="mx-auto max-w-3xl">
          <motion.div
            initial={{ rotate: -1.2 }}
            whileInView={{ rotate: -0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="paper relative rounded-lg border border-ink/10 p-8 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] sm:p-12 md:p-16"
          >
            {/* wax seal */}
            <div className="absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full border-4 border-ink/10 bg-gradient-to-br from-gold to-gold-2 text-ink shadow-xl">
              <Palette className="size-6" aria-hidden />
            </div>

            <div className="text-ink">
              <p className="font-display text-2xl italic md:text-3xl">Dear {toName},</p>

              <div className="mt-8 space-y-6 text-[15px] leading-[1.9] text-ink/80 md:text-base">
                <p>
                  Some people walk through the world — you repaint it. Every canvas you touch
                  turns ordinary light into something worth keeping, and every room you style
                  becomes a scene people never want to leave. It is a rare gift, to make beauty
                  look effortless — and you make it look like joy.
                </p>
                <p>
                  Today the calendar says it is your day. But honestly? Those of us who know
                  you celebrate you on every other day too — every time you mix one more
                  impossible shade of gold, every time you turn a simple evening into a memory
                  people will talk about for years.
                </p>
                <p>
                  Thank you for painting. Thank you for styling. Thank you for dreaming out
                  loud and inviting the rest of us in. The world is your gallery, and we are
                  all just lucky to walk through it.
                </p>
                <p className="font-display text-xl italic text-ink md:text-2xl">
                  Happy Artist Day — keep going. Your colours are far from finished.
                </p>
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                    With love & admiration
                  </p>
                  <p className="mt-2 font-display text-3xl italic">— your biggest fan</p>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-ink/45">
                  <Heart className="size-5 fill-terra text-terra" aria-hidden />
                  <Feather className="size-5" aria-hidden />
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
