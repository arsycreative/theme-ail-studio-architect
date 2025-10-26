"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { getMaterials } from "@/lib/data";
import { useLocale, useTranslations } from "next-intl";

export default function MaterialsPalette() {
  const ref = useRef(null);
  const locale = useLocale();
  const tMaterials = useTranslations("home.materialsPalette");
  const materials = useMemo(() => getMaterials(locale), [locale]);
  const [active, setActive] = useState(() => materials[0]?.key ?? null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mat-card]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setActive((prev) => {
      if (!materials.some((m) => m.key === prev)) {
        return materials[0]?.key ?? null;
      }
      return prev;
    });
  }, [materials]);

  const current =
    materials.find((m) => m.key === active) ?? materials[0] ?? null;

  if (!current) {
    return null;
  }

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            {tMaterials("title")}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {tMaterials("description")}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_420px] gap-6 items-stretch">
        {/* Large preview */}
        <div className="relative rounded-2xl overflow-hidden border border-border/70 min-h-[480px]">
          <Image
            key={current.preview}
            src={current.preview}
            alt={current.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority={false}
          />
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-background/70 to-transparent">
            <h3 className="text-lg font-medium">{current.name}</h3>
            <p className="text-sm text-muted-foreground">{current.desc}</p>
          </div>
        </div>

        {/* Swatches: full height 4-row grid */}
        <div className="grid grid-rows-4 gap-4 h-full">
          {materials.map((m) => {
            const isActive = m.key === active;
            return (
              <button
                type="button"
                key={m.key}
                data-mat-card
                onClick={() => setActive(m.key)}
                className={`relative rounded-xl overflow-hidden border transition ${
                  isActive
                    ? "border-foreground"
                    : "border-border/70 hover:border-border"
                }`}
                aria-label={tMaterials("ariaSelect", { name: m.name })}
              >
                <Image
                  src={m.swatch}
                  alt={m.name}
                  fill
                  className="object-cover"
                  sizes="420px"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
                  <span className="text-sm text-white drop-shadow">
                    {m.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
