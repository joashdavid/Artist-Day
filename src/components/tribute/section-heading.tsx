import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "left";
}

export function SectionHeading({ eyebrow, title, sub, align = "center" }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 md:mb-20",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-xl"
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-4 mb-5",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-10 bg-gold/60" aria-hidden />
          <span className="text-[11px] md:text-xs font-semibold tracking-[0.42em] uppercase text-gold">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-gold/60" aria-hidden />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold text-cream">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-cream/65">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
