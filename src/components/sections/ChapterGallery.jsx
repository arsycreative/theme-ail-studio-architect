"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ChapterGallery({ items = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".cg-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((it, idx) => {
        const landscape = it.ratio === "landscape";
        return (
          <div
            key={it.src + idx}
            className={`cg-item relative overflow-hidden rounded-xl border border-border/70 ${
              landscape
                ? "md:col-span-2 aspect-[16/10]"
                : "md:col-span-1 aspect-[3/4]"
            }`}
            data-cursor="View"
          >
            <Image
              src={it.src}
              alt="Chapter image"
              fill
              className="object-cover"
              sizes={
                landscape
                  ? "(min-width: 768px) 66vw, 100vw"
                  : "(min-width: 768px) 33vw, 100vw"
              }
              priority={false}
              data-lightbox="true"
            />
          </div>
        );
      })}
    </div>
  );
}
