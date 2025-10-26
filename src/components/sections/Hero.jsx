"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "next-intl";

export default function Hero() {
  const ref = useRef(null);
  const tlRef = useRef(null);
  const [active, setActive] = useState(0);
  const tHero = useTranslations("hero");
  const tCommon = useTranslations("common");

  const headingLines = tHero.raw("heading");
  const tagPills = tHero.raw("tags");
  console.log(tHero.raw("heading"));
  const frames = [
    "/hero-frame-1.webp",
    "/hero-frame-2.webp",
    "/hero-frame-3.webp",
    "/hero-frame-4.webp",
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context((self) => {
      // Reveal awal
      if (!reduced) {
        gsap.fromTo(
          ".hero-image",
          { scale: 1.06 },
          { scale: 1, duration: 1.1, ease: "power3.out" }
        );
        gsap.utils.toArray(".hero-line").forEach((line, i) => {
          gsap.fromTo(
            line,
            { y: 22, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.7,
              ease: "power3.out",
              delay: 0.1 + i * 0.08,
            }
          );
        });
        gsap.fromTo(
          ".hero-sub",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.36 }
        );
      } else {
        gsap.set(".hero-image", { scale: 1 });
        gsap.set(".hero-line", {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        gsap.set(".hero-sub", { y: 0, opacity: 1 });
      }

      // Slideshow cross-fade
      const slides = gsap.utils.toArray(".hero-frame");
      if (slides.length) {
        gsap.set(slides, { opacity: 0 });
        gsap.set(slides[0], { opacity: 1 });
        setActive(0);

        if (!reduced) {
          const hold = 3.2;
          const fade = 1.2;
          const tl = gsap.timeline({
            repeat: -1,
            defaults: { ease: "power2.inOut" },
          });

          for (let i = 0; i < slides.length; i++) {
            const cur = slides[i];
            const next = slides[(i + 1) % slides.length];
            tl.to(cur, { opacity: 1, duration: 0.001 });
            tl.call(() => setActive(i));
            tl.to({}, { duration: hold });
            tl.to(cur, { opacity: 0, duration: fade }, ">");
            tl.to(next, { opacity: 1, duration: fade }, "<");
          }
          tlRef.current = tl;

          const onVis = () => (document.hidden ? tl.pause() : tl.resume());
          document.addEventListener("visibilitychange", onVis);
          self.add(() =>
            document.removeEventListener("visibilitychange", onVis)
          );
        }
      }

      // Scroll polish
      if (!reduced) {
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=70%",
          scrub: true,
          onUpdate: (selfST) => {
            gsap.to(".hero-vignette", {
              opacity: 0.26 + selfST.progress * 0.34,
              duration: 0.1,
            });
            gsap.to(".hero-image", {
              yPercent: -4 * selfST.progress,
              duration: 0.1,
            });
          },
        });
        self.add(() => st.kill());
      }

      // Mouse parallax (subtle)
      const onMove = (e) => {
        if (reduced) return;
        const { innerWidth, innerHeight } = window;
        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;
        gsap.to(".hero-image", {
          x: x * 12,
          y: y * 10,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(".hero-ambient", {
          x: x * 10,
          y: y * 8,
          duration: 0.8,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMove);
      self.add(() => window.removeEventListener("mousemove", onMove));
    }, el);

    return () => ctx.revert();
  }, []);

  const jumpTo = (i) => {
    const tl = tlRef.current;
    if (!tl) return;
    const hold = 3.2;
    const fade = 1.2;
    const segment = hold + fade;
    tl.seek(i * (segment + 0.001), false);
    setActive(i);
  };

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[92svh] flex items-end overflow-clip"
    >
      {/* BACKDROP STACK */}
      <div className="absolute inset-0">
        {frames.map((src, i) => (
          <Image
            key={src}
            className="hero-image hero-frame absolute inset-0 object-cover will-change-transform"
            src={src}
            alt={tHero("alt")}
            fill
            sizes="100vw"
            priority={i === 0}
          />
        ))}

        {/* Vignette bawah untuk kontras area teks */}
        <div
          className="hero-vignette absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.3,
            background:
              "linear-gradient(to top, var(--background) 22%, transparent 60%)",
          }}
        />

        {/* Ambient elegan tanpa video */}
        <div className="hero-ambient absolute inset-0 pointer-events-none mix-blend-soft-light">
          <div className="ambient-1 absolute inset-[-10%]" />
          <div className="ambient-2 absolute inset-[-10%] opacity-60" />
        </div>

        {/* Grid lines subtle */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(transparent 95%, rgba(0,0,0,0.06) 96%), linear-gradient(90deg, transparent 95%, rgba(0,0,0,0.06) 96%)",
            backgroundSize: "100% 48px, 48px 100%",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* CONTENT + SCRIM ADAPTIF */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 w-full">
        <div
          className="pointer-events-none absolute left-[calc(50%-50vw)] right-[calc(50%-50vw)] bottom-0 
                  h-[52%] -z-10 bg-gradient-to-t from-background/85 via-background/35 to-transparent 
                  dark:from-background/88 dark:via-background/40"
        />

        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 backdrop-blur-[2px] px-3 py-1 text-xs text-muted-foreground">
          {tHero("badge")}
        </div>

        <h1 className="tracking-tight font-semibold leading-[1.04] text-foreground">
          {headingLines.map((line, index) => (
            <span
              key={line}
              className="hero-line block text-4xl md:text-6xl drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.6)]"
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-4 text-base md:text-lg text-muted-foreground max-w-2xl drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.45)]">
          {tHero("description")}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          {tagPills.map((label) => (
            <span
              key={label}
              className="rounded-full border border-border/70 bg-background/70 px-3 py-1"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2">
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            aria-label={tCommon("aria.goToFrame", { index: i + 1 })}
            aria-current={active === i ? "true" : "false"}
            className={`h-2.5 w-2.5 rounded-full border transition ${
              active === i
                ? "bg-foreground border-foreground"
                : "bg-transparent border-foreground/50 hover:border-foreground"
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground/90">
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] tracking-[0.2em] uppercase">
            {tHero("scroll")}
          </div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="animate-bounce"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
