"use client";
import { useEffect, useRef, useState } from "react";

export default function CursorLabel() {
  const ref = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = 0,
      y = 0,
      tx = 0,
      ty = 0;

    const move = (e) => {
      tx = e.clientX + 12;
      ty = e.clientY + 12;
      if (e.target && e.target.closest("[data-cursor]")) {
        const val =
          e.target.closest("[data-cursor]").getAttribute("data-cursor") || "";
        setText(val);
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
      }
    };

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[60] top-0 left-0 opacity-0 transition-opacity"
      style={{ willChange: "transform" }}
    >
      <span className="rounded-full px-3 py-1 text-xs bg-foreground text-background shadow-sm border border-border/50">
        {text}
      </span>
    </div>
  );
}
