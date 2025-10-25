"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const items = [
  {
    src: "/cinematic-1.webp",
    title: "Material & Light",
    meta: "Travertine edge study",
    ratio: "landscape",
  },
  {
    src: "/cinematic-2.webp",
    title: "Joinery Detail",
    meta: "Brass & oak junction",
    ratio: "portrait",
  },
  {
    src: "/cinematic-3.webp",
    title: "Circulation",
    meta: "Soft reveal across planes",
    ratio: "landscape",
  },
  {
    src: "/cinematic-4.webp",
    title: "Quiet Corner",
    meta: "Tone-on-tone palette",
    ratio: "portrait",
  },
  {
    src: "/cinematic-5.webp",
    title: "Salon",
    meta: "Diffuse daylight",
    ratio: "landscape",
  },
];

export default function CinematicStrip() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Fade/slide in tiap card
      gsap.utils.toArray(".cin-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });

      // Parallax pada WRAPPER yang overscaled
      gsap.utils.toArray(".cin-imgwrap").forEach((wrap) => {
        // pastikan sedikit lebih besar supaya tidak “bocor”
        gsap.set(wrap, { willChange: "transform" });
        gsap.fromTo(
          wrap,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Refresh saat semua resource ready (Next/Image kadang telat hitung tinggi)
      const onLoad = () => {
        if (gsap.core && gsap.core.globals?.ScrollTrigger) {
          gsap.core.globals().ScrollTrigger.refresh();
        }
      };
      window.addEventListener("load", onLoad, { once: true });
    }, el);

    return () => ctx.revert();
  }, []);

  const spanClass = (ratio) =>
    ratio === "landscape"
      ? "col-span-12 md:col-span-7 xl:col-span-8 aspect-[16/10]"
      : "col-span-12 md:col-span-5 xl:col-span-4 aspect-[3/4]";

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-20">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Cinematic Study</h2>
        <p className="text-sm text-muted-foreground">
          Material, light, and proportion across selected frames.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-4">
        {items.map((it) => (
          <figure
            key={it.src}
            className={`cin-card group relative overflow-hidden rounded-2xl border border-border/70 bg-background ${spanClass(
              it.ratio
            )} min-w-0`}
          >
            {/* PARALLAX WRAP —> dibikin lebih besar & yang dianimasikan */}
            <div className="cin-imgwrap absolute inset-0 scale-[1.12]">
              <Image
                src={it.src}
                alt={it.title}
                fill
                className="object-cover will-change-transform [transform:translateZ(0)]"
                sizes="(min-width:1280px) 50vw, (min-width:768px) 60vw, 100vw"
                priority={false}
              />
            </div>

            {/* stronger bottom gradient purely for legibility */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-28 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />

            {/* caption bar */}
            <figcaption className="absolute inset-x-3 md:inset-x-4 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/60 bg-background/65 backdrop-blur-md px-3.5 py-2 md:px-4 md:py-2.5 transition-colors group-hover:bg-background/75">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="text-xs md:text-[13px] font-medium truncate text-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,.20)]"
                  title={it.title}
                >
                  {it.title}
                </span>
              </div>
              <span
                className="text-[11px] md:text-xs truncate text-foreground/80 drop-shadow-[0_1px_1px_rgba(0,0,0,.28)]"
                title={it.meta}
              >
                {it.meta}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
