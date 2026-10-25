import Image from "next/image";
import { Brush } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { events } from "@/lib/artist";

function EventCard({
  event,
  index,
  tall = false,
}: {
  event: (typeof events)[number];
  index: number;
  tall?: boolean;
}) {
  return (
    <Reveal delay={index * 0.12} className="h-full">
      <article
        className={`card-frame group relative overflow-hidden rounded-xl border border-cream/10 ${
          tall ? "h-full min-h-[420px]" : "min-h-[240px]"
        }`}
      >
        <Image
          src={event.src}
          alt={event.title}
          width={event.w}
          height={event.h}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-ink/10 transition-opacity duration-500" />
        <span className="absolute right-5 top-5 font-display text-sm italic tracking-widest text-cream/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            <Brush className="size-3.5" aria-hidden />
            Styled by the artist
          </p>
          <h3 className="font-display text-2xl font-semibold text-cream md:text-[1.7rem]">
            {event.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/65">{event.blurb}</p>
        </div>
      </article>
    </Reveal>
  );
}

export function Events() {
  return (
    <section id="events" className="relative overflow-hidden py-28 md:py-36">
      <div
        className="pointer-events-none absolute -right-44 top-24 -z-10 h-[520px] w-[520px] rounded-full bg-terra/10 blur-[140px]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Beyond the Canvas"
          title={
            <>
              Worlds, styled <span className="text-gold-gradient italic">like paintings</span>
            </>
          }
          sub="The same hands that mix pigments also compose celebrations. Florals as brushstrokes, candlelight as glow — events that feel less like décor and more like stepping inside a canvas."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* feature card */}
          <EventCard event={events[0]} index={0} tall />
          {/* stacked cards */}
          <div className="grid gap-6">
            <EventCard event={events[1]} index={1} />
            <EventCard event={events[2]} index={2} />
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 text-center font-display text-xl italic text-cream/55 md:text-2xl">
            …and this is only the beginning.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
