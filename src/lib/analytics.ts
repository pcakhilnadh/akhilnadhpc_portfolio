import { analytics } from "../config/site";
import { onConsentChange, readConsent } from "./consent";

/*
 * Google Analytics 4, loaded by hand (no npm package), and only with consent.
 *
 * Until the visitor accepts analytics cookies (lib/consent.ts) gtag.js is not
 * even downloaded, so no request reaches Google and no cookie is set. If they
 * later withdraw, tracking stops at once and the _ga cookies are deleted.
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
    [disableKey: `ga-disable-${string}`]: boolean | undefined;
  }
}

const ID = analytics.measurementId;
const isLocal = () => /^(localhost|127\.|\[::1\]|192\.168\.)/.test(location.hostname);
/** GA's cookies: 13 months, the longest EU regulators accept, not GA's default 2 years. */
const COOKIE_MAX_AGE_S = 60 * 60 * 24 * 395;

let wired = false;
let loaded = false;
let enabled = false;
let sections: IntersectionObserver | null = null;

/** Starts tracking now if consent was given, and follows any later change. */
export function initAnalytics() {
  if (wired || !import.meta.env.PROD || isLocal()) return;
  wired = true;
  if (readConsent() === "granted") enable();
  onConsentChange((choice) => (choice === "granted" ? enable() : disable()));
}

/** Sends a click_<id> event. A no-op without consent, in dev, and on localhost. */
export function track(id: (typeof analytics.clicks)[number]["id"]) {
  if (enabled) window.gtag?.("event", `click_${id}`);
}

function enable() {
  if (enabled) return;
  enabled = true;
  window[`ga-disable-${ID}`] = false;

  if (!loaded) {
    loaded = true;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // gtag.js expects the real `arguments` object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    // Analytics only: every advertising use stays off.
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", ID, {
      cookie_expires: COOKIE_MAX_AGE_S,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    document.head.appendChild(s);
  } else {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
  }

  watchSections();
}

function disable() {
  if (!enabled) return;
  enabled = false;
  // GA's own opt-out switch: gtag.js sends nothing while this is true.
  window[`ga-disable-${ID}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  sections?.disconnect();
  sections = null;
  deleteGaCookies();
}

/** Removes _ga and _ga_<container> on this host and every parent domain GA may have used. */
function deleteGaCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const parts = location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);
  for (const name of names)
    for (const d of domains) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
}

/**
 * Starts counting a section that rendered after the page loaded (Insights only
 * appears once it has data). A no-op without consent.
 */
export function watchSection(id: string) {
  const el = document.getElementById(id);
  if (sections && el && !seen.has(id)) sections.observe(el);
}

/**
 * Counts a section once per page load, after it has sat in the middle band of
 * the viewport for a second (so fast scrolling past it doesn't count).
 */
const seen = new Set<string>();
function watchSections() {
  if (sections) return;
  const DWELL_MS = 1000;
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
              if (!enabled) return;
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
  sections = io;

  // Sections render with React; wait a frame so they exist.
  requestAnimationFrame(() =>
    analytics.sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && !seen.has(id)) io.observe(el);
    }),
  );
}
