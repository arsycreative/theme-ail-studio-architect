"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ChapterImage({ src, alt }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector("img");
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.to(img, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative w-full aspect-[16/9] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover will-change-transform"
        sizes="(min-width: 1024px) 900px, 100vw"
      />
    </div>
  );
}
