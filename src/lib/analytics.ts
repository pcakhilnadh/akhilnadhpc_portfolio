import { analytics } from "../config/site";

/*
 * Google Analytics 4, loaded by hand (no npm package).
 *
 * Event names are the data the Insights section reads back, so they follow a
 * fixed scheme that needs no custom dimensions in GA4:
 *   section_<id>  a visitor spent a moment on that section (once per page load)
 *   click_<id>    a tracked click (see analytics.clicks in config/site.ts)
 */

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const isLocal = () => /^(localhost|127\.|\[::1\]|192\.168\.)/.test(location.hostname);
let started = false;

/** Loads gtag.js and starts section tracking. Safe to call more than once. */
export function initAnalytics() {
  if (started || !import.meta.env.PROD || isLocal()) return;
  started = true;
  const id = analytics.measurementId;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js expects the real `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  watchSections();
}

/** Sends a click_<id> event. A no-op when analytics is off (dev, localhost). */
export function track(id: (typeof analytics.clicks)[number]["id"]) {
  window.gtag?.("event", `click_${id}`);
}

/**
 * Counts a section once per page load, after it has sat in the middle band of
 * the viewport for a second (so fast scrolling past it doesn't count).
 */
function watchSections() {
  const DWELL_MS = 1000;
  const seen = new Set<string>();
  const timers = new Map<string, number>();

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const id = e.target.id;
        if (seen.has(id)) continue;
        if (e.isIntersecting) {
          timers.set(
            id,
            window.setTimeout(() => {
              seen.add(id);
              io.unobserve(e.target);
              window.gtag?.("event", `section_${id}`);
            }, DWELL_MS),
          );
        } else {
          window.clearTimeout(timers.get(id));
          timers.delete(id);
        }
      }
    },
    { rootMargin: "-40% 0px -40% 0px" },
  );

  const observe = () =>
    analytics.sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  // Sections render with React; wait a frame so they exist.
  requestAnimationFrame(observe);
}
