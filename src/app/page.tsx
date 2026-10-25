import { Nav } from "@/components/tribute/nav";
import { Hero } from "@/components/tribute/hero";
import { Marquee } from "@/components/tribute/marquee";
import { Gallery } from "@/components/tribute/gallery";
import { About } from "@/components/tribute/about";
import { Events } from "@/components/tribute/events";
import { Letter } from "@/components/tribute/letter";
import { Footer } from "@/components/tribute/footer";
import { ScrollProgress } from "@/components/tribute/scroll-progress";
import { MotionPreferences } from "@/components/tribute/motion-preferences";

export default function Home() {
  return (
    <MotionPreferences>
    <div className="noise relative min-h-screen bg-ink text-cream">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Gallery />
        <About />
        <Events />
        <Letter />
      </main>
      <Footer />
    </div>
    </MotionPreferences>
  );
}
