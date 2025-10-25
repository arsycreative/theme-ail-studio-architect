"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({ before, after, aspect = "16/9" }) {
  const wrapRef = useRef(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(0.5); // 0..1

  const clamp = useCallback((v) => Math.min(1, Math.max(0, v)), []);

  const updateFromClientX = useCallback(
    (clientX) => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = clientX - rect.left;
      setPos(clamp(x / rect.width));
    },
    [clamp]
  );

  const onPointer = useCallback(
    (event) => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const clientX =
        typeof event.clientX === "number"
          ? event.clientX
          : event.touches?.[0]?.clientX;
      if (typeof clientX !== "number") return;
      const insideX = clientX >= rect.left && clientX <= rect.right;
      const insideY =
        event.clientY === undefined ||
        (event.clientY >= rect.top && event.clientY <= rect.bottom);
      if (!insideX || !insideY) return;
      updateFromClientX(clientX);
    },
    [updateFromClientX]
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    function stopDrag() {
      draggingRef.current = false;
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    }

    function handleMove(event) {
      if (!draggingRef.current) return;
      const rect = el.getBoundingClientRect();
      const clientX =
        typeof event.clientX === "number"
          ? event.clientX
          : event.touches?.[0]?.clientX;
      const clientY =
        typeof event.clientY === "number"
          ? event.clientY
          : event.touches?.[0]?.clientY;
      if (
        typeof clientX !== "number" ||
        clientX < rect.left ||
        clientX > rect.right ||
        (typeof clientY === "number" &&
          (clientY < rect.top || clientY > rect.bottom))
      ) {
        stopDrag();
        return;
      }
      updateFromClientX(clientX);
    }

    const startDrag = (event) => {
      draggingRef.current = true;
      onPointer(event);
      window.addEventListener("pointermove", handleMove, { passive: true });
      window.addEventListener("pointerup", stopDrag, { passive: true });
      window.addEventListener("pointercancel", stopDrag, { passive: true });
    };

    const handleLeave = (event) => {
      if (!draggingRef.current) return;
      const rect = el.getBoundingClientRect();
      const clientX =
        typeof event.clientX === "number"
          ? event.clientX
          : event.touches?.[0]?.clientX;
      const clientY =
        typeof event.clientY === "number"
          ? event.clientY
          : event.touches?.[0]?.clientY;
      if (
        typeof clientX === "number" &&
        (clientX < rect.left ||
          clientX > rect.right ||
          (typeof clientY === "number" &&
            (clientY < rect.top || clientY > rect.bottom)))
      ) {
        stopDrag();
      }
    };

    el.addEventListener("pointerdown", startDrag, { passive: true });
    el.addEventListener("pointerleave", handleLeave, { passive: true });
    el.addEventListener("pointerup", stopDrag, { passive: true });
    el.addEventListener("pointercancel", stopDrag, { passive: true });

    return () => {
      stopDrag();
      el.removeEventListener("pointerdown", startDrag);
      el.removeEventListener("pointerleave", handleLeave);
      el.removeEventListener("pointerup", stopDrag);
      el.removeEventListener("pointercancel", stopDrag);
    };
  }, [onPointer, updateFromClientX]);

  return (
    <div
      ref={wrapRef}
      className="relative rounded-2xl overflow-hidden border border-border/70 select-none touch-pan-y"
      style={{ aspectRatio: aspect }}
      data-cursor="Drag"
      aria-label="Before after slider"
    >
      {/* AFTER at bottom */}
      <Image
        src={after}
        alt="After"
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      {/* BEFORE clipped on top */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos * 100}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Before"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0"
        style={{ left: `${pos * 100}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-0.5 bg-foreground/80" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-3 flex items-center gap-2">
          <span className="rounded-full bg-background/80 border border-border/70 px-2 py-1 text-xs">
            Drag
          </span>
        </div>
      </div>
    </div>
  );
}
