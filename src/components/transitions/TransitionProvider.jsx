"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Professional Fade-Through Transition
 * - Initial mount: opacity 0 -> 1, y 8 -> 0, scale 0.985 -> 1
 * - Route change: quick fade-out then fade-in (tanpa overlay penuh layar)
 * - Honors prefers-reduced-motion
 */
export default function TransitionProvider({ children }) {
  const shellRef = useRef(null);
  const pageRef = useRef(null);
  const pathname = usePathname();

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initial mount
  useEffect(() => {
    if (!pageRef.current || reduced) return;
    gsap.set(pageRef.current, {
      opacity: 0,
      y: 8,
      scale: 0.985,
      filter: "blur(0.5px)",
    });
    gsap.to(pageRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.45,
      ease: "power2.out",
      delay: 0.05,
    });
  }, [reduced]);

  // Route change transition
  useEffect(() => {
    if (!pageRef.current || reduced) return;

    // small color wash (very subtle) to feel premium, not a full overlay
    const wash = document.createElement("div");
    wash.setAttribute("aria-hidden", "true");
    wash.style.position = "fixed";
    wash.style.inset = "0";
    wash.style.zIndex = "40";
    wash.style.pointerEvents = "none";
    wash.style.background =
      "radial-gradient(1200px 600px at 50% 50%, rgba(0,0,0,0.04), rgba(0,0,0,0))";
    wash.style.opacity = "0";
    document.body.appendChild(wash);

    const tl = gsap.timeline();
    tl.to(pageRef.current, {
      opacity: 0,
      y: 6,
      scale: 0.992,
      filter: "blur(0.4px)",
      duration: 0.18,
      ease: "power1.out",
    })
      .set(pageRef.current, { y: 8, scale: 0.985 })
      .to(pageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.32,
        ease: "power2.out",
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, reduced]);

  // Generic reveal for elements with data-reveal-up
  useEffect(() => {
    if (!shellRef.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-reveal-up]", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1,
      });
    }, shellRef);
    return () => ctx.revert();
  }, [pathname, reduced]);

  return (
    <div ref={shellRef}>
      {/* Page container that we animate */}
      <div ref={pageRef} data-fade-route>
        {children}
      </div>
    </div>
  );
}
