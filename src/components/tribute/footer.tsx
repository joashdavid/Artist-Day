import { Palette } from "lucide-react";
import { displayName } from "@/lib/artist";

export function Footer() {
  return (
    <footer className="relative border-t border-cream/10 bg-ink-2/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 text-center">
        <span className="grid size-12 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
          <Palette className="size-5" aria-hidden />
        </span>

        <div>
          <p className="font-display text-xl italic text-cream/85 md:text-2xl">
            Made with love, awe & a little paint.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.3em] text-cream/40">
            For {displayName || "the artist"} who colours our world · Happy Artist Day
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-cream/55">
            <li><a href="#gallery" className="transition-colors hover:text-gold">The Gallery</a></li>
            <li><a href="#artist" className="transition-colors hover:text-gold">The Artist</a></li>
            <li><a href="#events" className="transition-colors hover:text-gold">Events</a></li>
            <li><a href="#letter" className="transition-colors hover:text-gold">A Letter</a></li>
          </ul>
        </nav>

        <p className="text-xs text-cream/30">
          © {new Date().getFullYear()} · A one-page tribute, painted with pixels.
        </p>
      </div>
    </footer>
  );
}
