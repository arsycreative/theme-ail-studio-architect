// src/lib/scroll-lock.js
export function forceUnlockScroll() {
  const html = document.documentElement;
  const body = document.body;

  // Hapus style yang dipakai RemoveScroll (Radix Dialog/Sheet) & library lain
  [html, body].forEach((el) => {
    el.style.overflow = "";
    el.style.paddingRight = "";
    el.style.position = "";
    el.style.touchAction = "";
  });

  // Atribut/flag umum
  body.removeAttribute("data-scroll-locked");
  html.removeAttribute("data-scroll-locked");
  document.querySelectorAll("[data-scroll-locked]").forEach((el) => {
    el.removeAttribute("data-scroll-locked");
  });

  // Kadang RemoveScroll menempel element sentinel di body, biarkan saja.
  // Yang penting: kunci scroll-nya dilepas.
}
