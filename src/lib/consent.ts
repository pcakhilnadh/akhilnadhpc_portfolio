/*
 * The visitor's analytics-cookie choice (GDPR / ePrivacy).
 *
 *   - Nothing that sets cookies loads until the choice is "granted".
 *   - Closing the banner (×) is not consent: it hides the banner for this
 *     browser session and analytics stays off.
 *   - A choice is remembered on this device for 6 months, then asked again.
 *   - The footer's "Cookies" link reopens the banner so a choice can be
 *     changed or withdrawn as easily as it was given.
 *
 * The choice itself lives in localStorage. Storing it is strictly necessary to
 * honour it, so it needs no consent of its own.
 */

export type Choice = "granted" | "denied";

const KEY = "analytics-consent";
/** Bump to ask everyone again (e.g. when what is collected changes). */
const VERSION = 1;
const MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;
const CHANGE_EVENT = "consent:change";
export const OPEN_CONSENT_EVENT = "consent:open";

interface Stored {
  choice: Choice;
  at: number;
  v: number;
}

/** The current choice, or null if the visitor hasn't made one (or it expired). */
export function readConsent(): Choice | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Stored;
    if (s.v !== VERSION || Date.now() - s.at > MAX_AGE_MS) return null;
    return s.choice === "granted" || s.choice === "denied" ? s.choice : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Choice) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ choice, at: Date.now(), v: VERSION } satisfies Stored));
  } catch {
    /* storage blocked: the choice still applies to this page view */
  }
  window.dispatchEvent(new CustomEvent<Choice>(CHANGE_EVENT, { detail: choice }));
}

/** Calls back with every new choice. Returns an unsubscribe function. */
export function onConsentChange(cb: (choice: Choice) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<Choice>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

/** Reopens the consent banner (the footer's "Cookies" link). */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
