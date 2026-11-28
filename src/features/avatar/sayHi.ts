import { track } from "../../lib/analytics";
import { avatar } from "./controller";

/**
 * "Say hi" from anywhere on the page (the navbar button): scroll back to the
 * Home screen, then open the avatar once it's on screen, so the visitor sees
 * the greeting instead of it playing off-screen.
 */
export function sayHiFromAnywhere() {
  track("chat");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  // Wait for the scroll to reach the top (or give up after 1.5s), then open.
  const started = performance.now();
  const wait = () => {
    if (window.scrollY <= 2 || performance.now() - started > 1500) avatar.open();
    else requestAnimationFrame(wait);
  };
  requestAnimationFrame(wait);
}
