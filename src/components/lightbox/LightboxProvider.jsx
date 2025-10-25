"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

const LightboxCtx = createContext(null);
export const useLightbox = () => useContext(LightboxCtx);

export default function LightboxProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const stageRef = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0, s: 1 });

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => setImages([]), 250);
  }, []);

  const show = useCallback((list, start = 0) => {
    setImages(list);
    setIndex(start);
    setOpen(true);
    setT({ x: 0, y: 0, s: 1 });
  }, []);

  // 🔍 Klik global [data-lightbox="true"]
  useEffect(() => {
    const handler = (e) => {
      const el = e.target.closest?.("[data-lightbox='true']");
      if (!el) return;
      e.preventDefault();
      const src =
        el.getAttribute("data-src") || el.getAttribute("src") || el.dataset.src;
      const alt = el.getAttribute("alt") || "";
      if (!src) return;
      show([{ src, alt }], 0);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [show]);

  // ⌨️ Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(images.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, close]);

  // 🖱️ Zoom & Pan
  useEffect(() => {
    if (!open) return;
    const stage = stageRef.current;
    if (!stage) return;

    let dragging = false;
    let last = { x: 0, y: 0 };

    const onWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY;
      const factor = delta > 0 ? 1.08 : 0.92;
      setT((prev) => {
        const s = Math.min(6, Math.max(1, prev.s * factor));
        return { ...prev, s };
      });
    };

    const onDown = (e) => {
      dragging = true;
      last = {
        x: e.clientX ?? e.touches?.[0]?.clientX,
        y: e.clientY ?? e.touches?.[0]?.clientY,
      };
    };

    const onMove = (e) => {
      if (!dragging) return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX;
      const cy = e.clientY ?? e.touches?.[0]?.clientY;
      setT((prev) => ({
        ...prev,
        x: prev.x + (cx - last.x),
        y: prev.y + (cy - last.y),
      }));
      last = { x: cx, y: cy };
    };

    const onUp = () => (dragging = false);
    const onDbl = () => {
      setT((prev) =>
        prev.s === 1 ? { x: 0, y: 0, s: 2.2 } : { x: 0, y: 0, s: 1 }
      );
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    stage.addEventListener("dblclick", onDbl);

    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      stage.removeEventListener("dblclick", onDbl);
    };
  }, [open]);

  const value = { open, show };

  return (
    <LightboxCtx.Provider value={value}>
      {children}

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center"
          style={{ cursor: "grab" }}
        >
          {/* Tombol close */}
          <button
            type="button"
            className="absolute top-6 right-6 z-[75] rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm text-white/90"
            onClick={close}
            aria-label="Close lightbox"
          >
            Close ✕
          </button>

          {/* Tombol navigasi kiri/kanan */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-6 top-1/2 -translate-y-1/2 z-[75] rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm text-white/90"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-6 top-1/2 -translate-y-1/2 z-[75] rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm text-white/90"
                onClick={() =>
                  setIndex((i) => Math.min(images.length - 1, i + 1))
                }
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          {/* Stage */}
          <div
            ref={stageRef}
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{ touchAction: "none" }}
          >
            {images[index] && (
              <div
                style={{
                  transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.s})`,
                  transition: "transform 0.08s ease-out",
                  willChange: "transform",
                }}
              >
                <Image
                  src={images[index].src}
                  alt={images[index].alt || "Preview"}
                  width={2200}
                  height={1600}
                  className="rounded-2xl object-contain shadow-[0_0_60px_rgba(0,0,0,0.4)]"
                  style={{
                    maxWidth: "95vw",
                    maxHeight: "92vh",
                  }}
                  sizes="95vw"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      )}
    </LightboxCtx.Provider>
  );
}
