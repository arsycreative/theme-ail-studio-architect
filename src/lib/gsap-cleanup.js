// src/lib/gsap-cleanup.js
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Kill only pinned ScrollTriggers and fully revert their styles/spacers.
 * Use on route change before a global refresh.
 */
export function killPinnedScrollTriggers() {
  try {
    const all = ScrollTrigger.getAll();
    all.forEach((t) => {
      // t.pin adalah element yang sedang dipin
      // t.getPin() juga bisa, tapi t.pin sudah cukup
      if (t && t.pin) {
        // true => revert styles & hapus pin-spacer
        t.kill(true);
      }
    });
  } catch {}
}
