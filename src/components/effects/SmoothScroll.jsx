// src/providers/SmoothScroll.jsx
"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePathname } from "next/navigation";
import { forceUnlockScroll } from "@/lib/scroll-lock";
import { killPinnedScrollTriggers } from "@/lib/gsap-cleanup";

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      smoothTouch: false, // biar touch native (lebih aman)
      normalizeWheel: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    // Pakai satu RAF: GSAP ticker sebagai clock
    gsap.ticker.lagSmoothing(1000, 16);
    const tick = (time) => {
      // gsap.ticker memberi "time" dalam detik
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };
    gsap.ticker.add(tick);
    rafRef.current = 1;

    const listeners = [];

    listeners.push(lenis.on("scroll", ScrollTrigger.update));

    const releaseEdgeMomentum = ({ progress }) => {
      const EDGE_EPSILON = 0.0005;
      if (progress <= EDGE_EPSILON || progress >= 1 - EDGE_EPSILON) {
        lenis.reset?.();
      }
    };
    listeners.push(lenis.on("scroll", releaseEdgeMomentum));

    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
    ScrollTrigger.defaults({ fastScrollEnd: true, anticipatePin: 1 });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onLoad);
      listeners.forEach((stop) => stop?.());
      if (rafRef.current) gsap.ticker.remove(tick);
      try {
        lenis.destroy();
      } catch {}
    };
  }, []);

  // Saat route berubah: pastikan scroll unlocked & layout fresh
  useEffect(() => {
    // 1) Pastikan tidak ada scroll lock tersisa (dialog/lightbox)
    forceUnlockScroll();

    // 2) Bunuh hanya trigger yang melakukan PIN (hapus pin-spacer & restore style)
    killPinnedScrollTriggers();

    // 3) Pastikan Lenis aktif (kalau sebelumnya sempat stop oleh dialog)
    lenisRef.current?.start?.();

    // 4) Double refresh: quick → deep untuk menangkap layout & gambar
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(false);
      setTimeout(() => ScrollTrigger.refresh(true), 40);
    });
  }, [pathname]);

  const value = useMemo(() => ({ lenis: lenisRef }), []);
  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
