"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProjectMediaCarousel({ images = [], slug }) {
  const [idx, setIdx] = useState(0);
  const n = images.length || 0;

  const go = (d) => {
    if (!n) return;
    setIdx((v) => (v + d + n) % n);
  };

  // keyboard navigation (optional)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  return (
    // 🔑 wrapper jadi fleksibel, memenuhi tinggi kolom kiri Dialog
    <div className="flex flex-col h-full">
      {/* Viewer: sekarang tinggi fleksibel, bukan fixed aspect */}
      <div
        className="
          relative flex-1 min-h-0
          rounded-2xl overflow-hidden border border-border/70
        "
        data-cursor="View"
      >
        {n > 0 && (
          <Image
            key={images[idx]}
            src={images[idx]}
            alt={`${slug} image ${idx + 1}`}
            fill
            className="object-cover"
            sizes="(min-width: 1536px) 63vw, (min-width: 1280px) 60vw, (min-width: 768px) 58vw, 100vw"
            priority={false}
          />
        )}
        {/* Nav buttons (lebih besar & elegan) */}
        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/70 border border-border/60 rounded-full px-3.5 py-2 text-xs hover:bg-background/90"
          onClick={() => go(-1)}
          aria-label="Previous image"
        >
          Prev
        </button>
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/70 border border-border/60 rounded-full px-3.5 py-2 text-xs hover:bg-background/90"
          onClick={() => go(1)}
          aria-label="Next image"
        >
          Next
        </button>
      </div>

      {/* Thumbs: tinggi tetap supaya viewer bisa mengambil sisa tinggi */}
      <div className="mt-3 grid grid-cols-3 gap-2 h-[84px]">
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setIdx(i)}
            className={`relative h-full rounded-md overflow-hidden border ${
              i === idx
                ? "border-foreground"
                : "border-border/70 hover:border-border"
            }`}
            aria-label={`Select image ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${slug} thumb ${i + 1}`}
              fill
              className="object-cover"
              sizes="200px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
