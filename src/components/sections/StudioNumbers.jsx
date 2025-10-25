"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const items = [
  { k: "Years", v: 12, sub: "practice" },
  { k: "Projects", v: 180, sub: "delivered" },
  { k: "Cities", v: 9, sub: "across regions" },
  { k: "Awards", v: 14, sub: "recognitions" },
];

export default function StudioNumbers() {
  const ref = useRef(null);

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
          <div key={it.k} className="space-y-1">
            <div className="text-3xl md:text-4xl font-semibold tabular-nums">
              <span className="num" data-to={it.v}>
                0
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {it.k} — {it.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
