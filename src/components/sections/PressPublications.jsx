"use client";
import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";

export default function PressPublications() {
  const ref = useRef(null);
  const tPress = useTranslations("home.pressPublications");
  const items = useMemo(() => tPress.raw("items") ?? [], [tPress]);
  const title = tPress("title");

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
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
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
