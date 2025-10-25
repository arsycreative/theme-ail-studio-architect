"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const quotes = [
  { q: "Refined, timeless, and deeply livable.", a: "Residence Client" },
  { q: "Obsessed with details—quiet luxury done right.", a: "Hotel Operator" },
  { q: "Beautifully restrained. The light is masterful.", a: "Design Editor" },
  { q: "Craft and proportion beyond trends.", a: "Developer" },
];

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const track = ref.current?.querySelector(".track");
    if (!track) return;
    const width = track.scrollWidth / 2;
    const tween = gsap.fromTo(
      track,
      { x: 0 },
      { x: -width, duration: 30, ease: "none", repeat: -1 }
    );
    return () => tween?.kill();
  }, []);

  return (
    <section className="py-14 border-y border-border/60">
      <div className="overflow-hidden">
        <div ref={ref} className="relative">
          <div className="track whitespace-nowrap">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="inline-flex gap-8 px-8 align-top">
                  {quotes.map((t) => (
                    <span
                      key={t.q}
                      className="inline-block max-w-[38ch] align-top"
                    >
                      <span className="text-base md:text-lg">
                        &ldquo;{t.q}&rdquo;
                      </span>
                      <span className="block text-sm text-muted-foreground mt-2">
                        — {t.a}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
