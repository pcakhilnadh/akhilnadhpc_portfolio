import type { MouseEvent } from "react";

/**
 * In-page links scroll to their target without touching the URL, so the
 * address bar never gains a "/#section" suffix. (Smooth scrolling and its
 * reduced-motion opt-out come from the `scroll-behavior` rule in base.css.)
 */
export function scrollToHash(e: MouseEvent<HTMLAnchorElement>, hash: string, afterScroll?: () => void) {
  if (!hash.startsWith("#")) return; // real links navigate normally
  e.preventDefault();
  document.querySelector(hash)?.scrollIntoView();
  afterScroll?.();
}
