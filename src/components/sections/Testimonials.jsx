"use client";
import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";

export default function Testimonials() {
  const ref = useRef(null);
  const tTestimonials = useTranslations("home.testimonials");
  const quotes = useMemo(
    () => tTestimonials.raw("quotes") ?? [],
    [tTestimonials]
  );

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
                  {quotes.map((item) => (
                    <span
                      key={item.quote}
                      className="inline-block max-w-[38ch] align-top"
                    >
                      <span className="text-base md:text-lg">
                        &ldquo;{item.quote}&rdquo;
                      </span>
                      <span className="block text-sm text-muted-foreground mt-2">
                        — {item.author}
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
