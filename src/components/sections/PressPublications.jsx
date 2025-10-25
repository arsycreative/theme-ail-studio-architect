"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const items = [
  {
    name: "Dezeen",
    year: "2025",
    title: "Urban Calm: Brass & Travertine Apartment",
  },
  {
    name: "ArchDaily",
    year: "2024",
    title: "Lumière Residence: A Dialogue with Light",
  },
  {
    name: "Wallpaper*",
    year: "2024",
    title: "Quiet Luxury: Material Honesty at Home",
  },
  {
    name: "DesignBoom",
    year: "2023",
    title: "Crafted Joinery in Minimal Interiors",
  },
];

export default function PressPublications() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-press-item]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: i * 0.05 }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Press / Publications
      </h2>
      <div className="rounded-2xl border border-border/70 divide-y divide-border/70 overflow-hidden">
        {items.map((it) => (
          <div
            key={it.name + it.year}
            className="grid grid-cols-[1fr_auto] gap-4 p-5 md:p-6"
            data-press-item
          >
            <div>
              <p className="font-medium">{it.name}</p>
              <p className="text-sm text-muted-foreground">{it.title}</p>
            </div>
            <div className="text-sm text-muted-foreground">{it.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
