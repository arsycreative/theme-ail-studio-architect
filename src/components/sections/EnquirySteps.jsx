"use client";
import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function EnquirySteps() {
  const ref = useRef(null);
  const tSteps = useTranslations("home.enquirySteps");
  const steps = useMemo(() => tSteps.raw("steps") ?? [], [tSteps]);
  const title = tSteps("title");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-step]"),
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-2xl border border-border/70 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div
              key={s.key}
              data-step
              className="rounded-xl border border-border/70 p-4"
            >
              <div className="text-xs text-muted-foreground">{s.key}</div>
              <div className="mt-1 font-medium">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
