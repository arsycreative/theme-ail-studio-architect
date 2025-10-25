"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const milestones = [
  {
    year: "2019",
    title: "Studio Founded",
    text: "Initial practice focusing on residential interiors.",
  },
  {
    year: "2021",
    title: "Regional Commission",
    text: "Expanded work to commercial spaces across SEA.",
  },
  {
    year: "2023",
    title: "Award Recognition",
    text: "Selected in design awards for crafted joinery.",
  },
  {
    year: "2025",
    title: "Sustainable Initiative",
    text: "Material lifecycle & passive strategies refined.",
  },
];

export default function StudioTimeline() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-tl-item]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: -14, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">
        Studio Timeline
      </h2>
      <div className="relative">
        <div
          className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/80"
          aria-hidden
        />
        <div className="space-y-8">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`relative grid md:grid-cols-2 gap-6 items-start ${
                i % 2 ? "md:text-left" : "md:text-right"
              }`}
              data-tl-item
            >
              {/* left */}
              <div className={`${i % 2 ? "md:order-2" : "md:order-1"}`}>
                <div className="inline-flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {m.year}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-foreground/90" />
                </div>
                <h3 className="text-lg font-medium mt-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.text}</p>
              </div>
              {/* spacer/right empty to balance layout */}
              <div className={`${i % 2 ? "md:order-1" : "md:order-2"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
