import { useEffect, useId, useRef, useState } from "react";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent, type Choice } from "../../lib/consent";
import "./consentBanner.css";

const DISMISS_KEY = "consent-banner-dismissed";

function dismissedThisSession() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * The analytics-cookie notice. Small and non-blocking, pinned to the bottom of
 * the screen. Accept and Decline carry equal weight; × only closes it for this
 * session and does not count as consent. Reopened from the footer.
 */
export function ConsentBanner() {
  const [current, setCurrent] = useState<Choice | null>(readConsent);
  const [open, setOpen] = useState(() => current === null && !dismissedThisSession());
  const [details, setDetails] = useState(false);
  const detailsId = useId();
  const titleId = useId();
  const ref = useRef<HTMLElement>(null);

  // The footer's "Cookies" link.
  useEffect(() => {
    const onOpen = () => {
      setCurrent(readConsent());
      setOpen(true);
      requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>("button")?.focus());
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  // While open: the install prompt steps aside, and --consent-space tells the
  // Home screen's "Say hi" button how far to lift so the strip never covers it.
  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!open || !el) return;
    root.dataset.consentOpen = "";
    const ro = new ResizeObserver(() => {
      const gap = 12 + 4 * 2; // strip's offset above the footer + its 3D edge
      root.style.setProperty("--consent-space", `${Math.ceil(el.getBoundingClientRect().height) + gap}px`);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      delete root.dataset.consentOpen;
      root.style.removeProperty("--consent-space");
    };
  }, [open]);

  if (!open) return null;

  const choose = (choice: Choice) => {
    saveConsent(choice);
    setCurrent(choice);
    setOpen(false);
    setDetails(false);
  };

  const dismiss = () => {
    setOpen(false);
    setDetails(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* stays closed until reload */
    }
  };

  return (
    <aside ref={ref} className="consent np" aria-labelledby={titleId}>
      <div className="consent__row">
        <p className="consent__text">
          <span id={titleId} className="consent__title">
            Cookies
          </span>{" "}
          Allow Google Analytics cookies to count visits? Nothing loads unless you accept.{" "}
          <button
            type="button"
            className="consent__more"
            aria-expanded={details}
            aria-controls={detailsId}
            onClick={() => setDetails((d) => !d)}
          >
            {details ? "Less" : "Details"}
          </button>
        </p>

        {/* When reopened from the footer, the current choice shows as the pressed button. */}
        <div className="consent__actions">
          <button
            type="button"
            className="np np-btn np-btn--ghost np-btn--sm"
            aria-pressed={current === "denied"}
            onClick={() => choose("denied")}
          >
            {current === "denied" && <span aria-hidden="true">✓</span>}
            Decline
          </button>
          <button
            type="button"
            className="np np-btn np-btn--ghost np-btn--sm"
            aria-pressed={current === "granted"}
            onClick={() => choose("granted")}
          >
            {current === "granted" && <span aria-hidden="true">✓</span>}
            Accept
          </button>
        </div>

        <button type="button" className="consent__close" aria-label="Close without choosing" onClick={dismiss}>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <dl id={detailsId} className="consent__details" hidden={!details}>
        <div>
          <dt>Service</dt>
          <dd>Google Analytics 4, run by Google Ireland Ltd. Advertising features are off.</dd>
        </div>
        <div>
          <dt>Collected</dt>
          <dd>Sections viewed, a few clicks, approximate location (city), device and browser. GA4 does not store IP addresses.</dd>
        </div>
        <div>
          <dt>Cookies</dt>
          <dd>
            <code>_ga</code>, <code>_ga_*</code>, kept up to 13 months. Data may be processed outside the EU by Google.
          </dd>
        </div>
        <div>
          <dt>Your choice</dt>
          <dd>
            Remembered for 6 months. Change it anytime with <em>Cookies</em> in the footer. See{" "}
            <a className="text-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google&apos;s privacy policy
            </a>
            .
          </dd>
        </div>
      </dl>
    </aside>
  );
}
