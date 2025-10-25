"use client";
import { useEffect, useState } from "react";

export default function ProgressIndicator() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setP(scrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed right-4 top-24 z-30 hidden md:block">
      <div className="w-1 h-40 rounded-full bg-border overflow-hidden">
        <div
          className="w-full bg-foreground"
          style={{ height: `${Math.min(100, Math.max(0, p))}%` }}
        />
      </div>
    </div>
  );
}
