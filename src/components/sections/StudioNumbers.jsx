"use client";
import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function StudioNumbers() {
  const ref = useRef(null);
  const tNumbers = useTranslations("home.studioNumbers");
  const items = useMemo(
    () => tNumbers.raw("items") ?? [],
    [tNumbers]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".num").forEach((el) => {
        const target = Number(el.dataset.to || "0");
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.floor(obj.val);
              },
            });
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border border-border/70 rounded-2xl p-6 md:p-8">
        {items.map((it) => (
          <div key={it.label} className="space-y-1">
            <div className="text-3xl md:text-4xl font-semibold tabular-nums">
              <span className="num" data-to={it.value}>
                0
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {it.label} — {it.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
