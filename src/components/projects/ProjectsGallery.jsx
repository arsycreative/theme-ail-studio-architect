"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, Flip } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import ProjectQuickView from "@/components/sections/ProjectQuickView";

export default function ProjectsGallery({ items = [], density = "Comfort" }) {
  const wrapRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  // FLIP on items change (filter/sort)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const state = Flip.getState(wrap.querySelectorAll("[data-card]"));
    // force DOM update by touching a css var (not necessary here but safe)
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.02,
      });
    });
  }, [items, density]);

  // Density presets
  const densityClasses =
    density === "Compact"
      ? {
          grid: "grid md:grid-cols-3 gap-4",
          card: "rounded-xl",
          image: "aspect-[4/5]",
        }
      : {
          grid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
          card: "rounded-2xl",
          image: "aspect-[4/5]",
        };

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div ref={wrapRef} className={densityClasses.grid}>
          {items.map((p) => (
            <article
              key={p.slug}
              data-card
              className={`group relative overflow-hidden border border-border/70 ${densityClasses.card}`}
            >
              {/* image */}
              <div className={`relative ${densityClasses.image}`}>
                <div
                  data-flip-id={`project-${p.slug}-image`}
                  className="absolute inset-0"
                >
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    priority={false}
                  />
                </div>
                <div
                  className="absolute inset-0 bg-black/0 transition duration-500 pointer-events-none transform-gpu will-change-transform group-hover:bg-black/20 group-hover:scale-[1.04]"
                  style={{ transformOrigin: "center" }}
                />
                <div className="absolute bottom-3 right-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrent(p);
                      setOpen(true);
                    }}
                    className="rounded-lg border border-border/70 bg-background/70 px-3 py-1.5 text-xs"
                    data-cursor="Quick View"
                    aria-label="Quick View"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* meta */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {p.tags?.slice(0, 3).map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    <Link
                      href={`/case-studies/${p.slug}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {p.year}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{p.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quick View dialog (pakai komponen yang sudah kamu gunakan di Home) */}
      <ProjectQuickView open={open} onClose={setOpen} project={current} />
    </>
  );
}
