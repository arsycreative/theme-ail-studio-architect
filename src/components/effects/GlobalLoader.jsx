"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Global loader overlay that covers the viewport during initial hydration
 * and while navigating between app-router pages.
 */
export default function GlobalLoader() {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(true);
  const [visible, setVisible] = useState(true);
  const hideTimerRef = useRef();
  const removeTimerRef = useRef();

  const scheduleHide = (delay = 0) => {
    clearTimeout(hideTimerRef.current);
    clearTimeout(removeTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      removeTimerRef.current = setTimeout(() => setShouldRender(false), 280);
    }, delay);
  };

  useEffect(() => {
    const onReady = () => scheduleHide(120);

    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
      return () => window.removeEventListener("load", onReady);
    }
  }, []);

  useEffect(() => {
    setShouldRender(true);
    setVisible(true);
    scheduleHide(420);
    return () => {
      clearTimeout(hideTimerRef.current);
      clearTimeout(removeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] grid place-items-center bg-background text-foreground transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs uppercase tracking-[0.6em] text-muted-foreground">
            Architecture • Interiors • Living
          </span>
          <span className="text-3xl font-semibold tracking-wide">
            AIL Studio
          </span>
        </div>
        <div
          className="h-14 w-14 animate-spin rounded-full border border-border/60 border-t-primary"
          aria-hidden="true"
        />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
