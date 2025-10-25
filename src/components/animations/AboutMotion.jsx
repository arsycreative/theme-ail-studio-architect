// src/components/animations/AboutMotion.jsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function AboutMotion() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current || document.documentElement;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-reveal-up]", { y: 0, opacity: 1 });
        gsap.set("[data-reveal-fade]", { opacity: 1 });
        gsap.set("[data-stagger] > *", { y: 0, opacity: 1 });
        return;
      }

      // Tambah hint GPU
      gsap.set(
        "[data-reveal-up], [data-reveal-fade], [data-parallax-y], .about-hero-img",
        {
          willChange: "transform, opacity",
          force3D: true,
        }
      );

      // Reveal: elemen tunggal
      gsap.utils.toArray("[data-reveal-up]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 70%",
              once: true, // reveal sekali
              fastScrollEnd: true,
            },
          }
        );
      });

      // Fade
      gsap.utils.toArray("[data-reveal-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 70%",
              once: true,
            },
          }
        );
      });

      // Stagger children (container)
      gsap.utils.toArray("[data-stagger]").forEach((wrap) => {
        const items = Array.from(wrap.children);
        gsap.fromTo(
          items,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.48,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: wrap,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Parallax generik
      gsap.utils.toArray("[data-parallax-y]").forEach((el) => {
        const amt = Number(el.getAttribute("data-parallax-y")) || -6;
        gsap.to(el, {
          yPercent: amt,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom+=10% top", // bukan "bottom top" — sisakan ruang
            scrub: 0.6,
            preventOverlaps: true,
          },
        });
      });

      // Hero parallax
      const hero = document.querySelector(".about-hero");
      const img = document.querySelector(".about-hero-img");
      if (hero && img) {
        gsap.to(img, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=65%",
            scrub: 0.6,
          },
        });
        gsap.fromTo(
          img,
          { scale: 1.035 },
          { scale: 1, duration: 0.9, ease: "power3.out" }
        );
      }

      // Setelah semua set, refresh sekali
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={ref} aria-hidden />;
}
