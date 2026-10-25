"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fade-up reveal when the element scrolls into view (fires once). */
export function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !element.animate || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!preference.matches) {
        animation = element.animate(
          [{ opacity: 0, transform: `translateY(${y}px)` }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 500, delay: Math.min(delay * 1000, 120), easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
      }
    }, { rootMargin: "60px 0px" });
    const onPreference = () => { if (preference.matches) animation?.cancel(); };
    preference.addEventListener("change", onPreference);
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", onPreference);
    };
  }, [delay, y]);
  // Server HTML stays visible even on slow connections or without JavaScript.
  return <div ref={ref} className={className}>{children}</div>;
}
