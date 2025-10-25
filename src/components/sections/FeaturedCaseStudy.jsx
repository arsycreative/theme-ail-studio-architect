"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/lib/data";

export default function FeaturedCaseStudy() {
  const ref = useRef(null);
  // pilih satu project (misal index 0); bisa diganti ke yang kamu mau
  const p = projects[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fc-reveal]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!p) return null;

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold" data-fc-reveal>
          Featured Case Study
        </h2>
        <p className="text-muted-foreground" data-fc-reveal>
          A deeper look into process, details, and spatial performance.
        </p>
      </header>

      <div className="grid md:grid-cols-[70%_30%] gap-6">
        <div
          className="relative rounded-2xl overflow-hidden border border-border/70 aspect-[16/9]"
          data-fc-reveal
        >
          <Image
            src={p.cover}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 70vw, 100vw"
            priority={false}
            data-lightbox="true"
          />
        </div>
        <aside
          className="rounded-2xl border border-border/70 p-6 flex flex-col"
          data-fc-reveal
        >
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-medium">{p.title}</h3>
            <p className="text-sm text-muted-foreground">
              {p.location} • {p.year}
            </p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            A calm spatial narrative with precise details and enduring
            materials. The study explores proportion, light, and circulation
            with a restrained palette.
          </p>
          <div className="mt-auto pt-6">
            <Link
              href={`/case-studies/${p.slug}`}
              className="underline underline-offset-4"
              data-cursor="View"
            >
              Open Case Study →
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
