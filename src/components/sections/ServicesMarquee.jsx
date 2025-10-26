"use client";
import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ServicesMarquee() {
  const ref = useRef(null);
  const tServices = useTranslations("home.servicesMarquee");
  const items = useMemo(
    () => tServices.raw("items") ?? [],
    [tServices]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current;
      const track = el.querySelector(".track");
      const width = track.scrollWidth / 2;
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -width,
          duration: 20,
          repeat: -1,
          ease: "none",
        }
      );
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) =>
          gsap.to(track, { timeScale: 0.5 + self.getVelocity() / 300 }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-14 border-y border-border/60">
      <div className="overflow-hidden">
        <div className="track whitespace-nowrap will-change-transform">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className="inline-block px-8 text-2xl md:text-3xl tracking-wide"
              >
                {items.join(" • ")}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
