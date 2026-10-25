import { Sparkle } from "lucide-react";
import { marqueeWords } from "@/lib/artist";

/** Angled gold band with an infinite scrolling list of the artist's talents. */
export function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section aria-hidden className="relative z-20 -my-6 overflow-hidden py-6">
      <div className="-rotate-[1.6deg] scale-[1.03]">
        <div className="border-y border-ink/20 bg-gold py-3.5 shadow-[0_18px_50px_-18px_rgba(228,185,91,0.55)]">
          <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap pr-10">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
                {row.map((word, i) => (
                  <span
                    key={`${copy}-${i}`}
                    className="flex items-center gap-10 font-display text-lg italic font-semibold text-ink md:text-xl"
                  >
                    {word}
                    <Sparkle className="size-4 fill-ink/80 text-ink/80" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
