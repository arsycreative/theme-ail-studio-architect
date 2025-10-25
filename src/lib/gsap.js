// src/lib/gsap.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
// import plugin lain kalau ada

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger, Flip);

  // Kurangi spike CPU: kalau frame jatuh, GSAP "susun ulang" durasi
  gsap.ticker.lagSmoothing(1000, 16);

  // Normalize scroll (mencegah lompatan pertama saat back/forward)
  ScrollTrigger.clearScrollMemory("manual"); // reset posisi cached
  setTimeout(() => ScrollTrigger.refresh(), 0);
}

export { gsap, ScrollTrigger, Flip };
