"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Palette, X } from "lucide-react";
import { artist, displayName, navLinks } from "@/lib/artist";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-cream/10 bg-ink/95"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-transform duration-500 group-hover:rotate-[25deg]">
            <Palette className="size-5" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-cream">
              {artist.siteTitle}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-gold/90">
              {displayName ? `for ${displayName}` : artist.role}
            </span>
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-cream/75 transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#letter"
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-2 hover:shadow-[0_0_28px_rgba(228,185,91,0.45)]"
            >
              Open the letter
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-full border border-cream/15 text-cream md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-cream/10 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-6 py-5">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-display text-xl text-cream/85 transition-colors hover:bg-cream/5 hover:text-gold"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
