"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function EnquirySteps() {
  const ref = useRef(null);

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
        <h2 className="text-2xl md:text-3xl font-semibold">How We Engage</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            {
              k: "01",
              t: "Brief & Call",
              d: "Kamu kirim scope singkat; kami jadwalkan call 20–30 menit.",
            },
            {
              k: "02",
              t: "Initial Read",
              d: "Kami kirim bacaan awal: pendekatan, tim, dan estimasi garis besar.",
            },
            {
              k: "03",
              t: "Proposal",
              d: "Jika cocok, kami susun fee proposal dan perkiraan jadwal kerja.",
            },
          ].map((s) => (
            <div
              key={s.k}
              data-step
              className="rounded-xl border border-border/70 p-4"
            >
              <div className="text-xs text-muted-foreground">{s.k}</div>
              <div className="mt-1 font-medium">{s.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
